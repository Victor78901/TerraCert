BEGIN;

CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE app_role AS ENUM ('public', 'reviewer', 'admin');
CREATE TYPE app_language AS ENUM ('en', 'sw');
CREATE TYPE subdivision_status AS ENUM ('pending', 'approved', 'rejected', 'revoked', 'unknown');
CREATE TYPE caveat_kind AS ENUM ('caveat', 'dispute', 'restriction', 'court_order', 'other');
CREATE TYPE record_status AS ENUM ('active', 'resolved', 'withdrawn', 'unknown');
CREATE TYPE fraud_report_kind AS ENUM ('suspected_scam', 'double_allocation', 'forged_approval', 'group_ranch_restriction', 'other');
CREATE TYPE fraud_report_status AS ENUM ('submitted', 'under_review', 'substantiated', 'unsubstantiated', 'closed');
CREATE TYPE verification_result AS ENUM ('approved_subdivision', 'disputed_or_caveat', 'missing_county_approval', 'group_ranch_restriction', 'record_not_found', 'data_unavailable');
CREATE TYPE payment_status AS ENUM ('initiated', 'pending', 'succeeded', 'failed', 'cancelled');

CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text,
    phone_e164 text,
    password_hash text,
    display_name text,
    role app_role NOT NULL DEFAULT 'public',
    preferred_language app_language NOT NULL DEFAULT 'en',
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT users_contact_required CHECK (email IS NOT NULL OR phone_e164 IS NOT NULL)
);

CREATE UNIQUE INDEX users_email_lower_uq ON users (lower(email)) WHERE email IS NOT NULL;
CREATE UNIQUE INDEX users_phone_e164_uq ON users (phone_e164) WHERE phone_e164 IS NOT NULL;

CREATE TABLE land_parcels (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    county_code char(3) NOT NULL DEFAULT '034' CHECK (county_code = '034'),
    registry_name text,
    plot_number text,
    title_number text,
    parcel_name text,
    tenure_type text,
    land_use text,
    area_sqm numeric(14, 2) CHECK (area_sqm IS NULL OR area_sqm > 0),
    group_ranch_name text,
    group_ranch_restriction boolean NOT NULL DEFAULT false,
    boundary geometry(MultiPolygon, 4326),
    boundary_source text,
    boundary_checked_at timestamptz,
    record_source text,
    source_reference text,
    source_checked_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT land_parcels_identifier_required CHECK (plot_number IS NOT NULL OR title_number IS NOT NULL),
    CONSTRAINT land_parcels_boundary_valid CHECK (boundary IS NULL OR ST_IsValid(boundary))
);

-- Non-unique by design: duplicate identifiers must remain queryable for review.
CREATE INDEX land_parcels_plot_lookup_idx
    ON land_parcels (county_code, lower(btrim(plot_number))) WHERE plot_number IS NOT NULL;
CREATE INDEX land_parcels_title_lookup_idx
    ON land_parcels (county_code, lower(btrim(title_number))) WHERE title_number IS NOT NULL;
CREATE INDEX land_parcels_boundary_gist_idx ON land_parcels USING gist (boundary);

CREATE TABLE subdivisions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_parcel_id uuid NOT NULL REFERENCES land_parcels(id) ON DELETE RESTRICT,
    application_reference text,
    approval_reference text,
    status subdivision_status NOT NULL DEFAULT 'unknown',
    proposed_lot_count integer CHECK (proposed_lot_count IS NULL OR proposed_lot_count > 0),
    approving_authority text,
    applied_at date,
    decided_at date,
    source_name text,
    source_reference text,
    source_checked_at timestamptz,
    notes_internal text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT subdivisions_id_parent_unique UNIQUE (id, parent_parcel_id)
);

CREATE INDEX subdivisions_parent_parcel_idx ON subdivisions (parent_parcel_id);
CREATE INDEX subdivisions_approval_reference_idx ON subdivisions (lower(btrim(approval_reference))) WHERE approval_reference IS NOT NULL;

CREATE TABLE parcel_subdivision_links (
    subdivision_id uuid NOT NULL REFERENCES subdivisions(id) ON DELETE RESTRICT,
    parent_parcel_id uuid NOT NULL REFERENCES land_parcels(id) ON DELETE RESTRICT,
    child_parcel_id uuid NOT NULL REFERENCES land_parcels(id) ON DELETE RESTRICT,
    PRIMARY KEY (subdivision_id, child_parcel_id),
    CONSTRAINT parcel_subdivision_parent_fk FOREIGN KEY (subdivision_id, parent_parcel_id)
        REFERENCES subdivisions (id, parent_parcel_id) ON DELETE RESTRICT,
    CONSTRAINT parcel_subdivision_not_self CHECK (child_parcel_id <> parent_parcel_id)
);

CREATE INDEX parcel_subdivision_child_idx ON parcel_subdivision_links (child_parcel_id);

CREATE TABLE caveats_disputes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    parcel_id uuid NOT NULL REFERENCES land_parcels(id) ON DELETE RESTRICT,
    kind caveat_kind NOT NULL,
    status record_status NOT NULL DEFAULT 'unknown',
    reference_number text,
    issuing_authority text,
    filed_at date,
    resolved_at date,
    public_summary text,
    source_name text,
    source_reference text,
    source_checked_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX caveats_disputes_parcel_status_idx ON caveats_disputes (parcel_id, status);
CREATE INDEX caveats_disputes_reference_idx ON caveats_disputes (lower(btrim(reference_number))) WHERE reference_number IS NOT NULL;

CREATE TABLE fraud_reports (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
    parcel_id uuid REFERENCES land_parcels(id) ON DELETE SET NULL,
    plot_number_snapshot text,
    title_number_snapshot text,
    kind fraud_report_kind NOT NULL,
    description text NOT NULL,
    evidence_object_keys text[] NOT NULL DEFAULT '{}',
    status fraud_report_status NOT NULL DEFAULT 'submitted',
    moderator_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
    moderation_note text,
    published_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT fraud_reports_identifier_required CHECK (
        parcel_id IS NOT NULL OR plot_number_snapshot IS NOT NULL OR title_number_snapshot IS NOT NULL
    )
);

CREATE INDEX fraud_reports_parcel_status_idx ON fraud_reports (parcel_id, status);
CREATE INDEX fraud_reports_created_at_idx ON fraud_reports (created_at DESC);

CREATE TABLE payments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES users(id) ON DELETE SET NULL,
    parcel_id uuid REFERENCES land_parcels(id) ON DELETE SET NULL,
    amount_kes numeric(12, 2) NOT NULL CHECK (amount_kes > 0),
    status payment_status NOT NULL DEFAULT 'initiated',
    phone_e164_ciphertext bytea,
    merchant_request_id text,
    checkout_request_id text,
    mpesa_receipt_number text,
    result_code text,
    initiated_at timestamptz NOT NULL DEFAULT now(),
    callback_received_at timestamptz,
    reconciled_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT payments_checkout_request_unique UNIQUE (checkout_request_id),
    CONSTRAINT payments_receipt_unique UNIQUE (mpesa_receipt_number)
);

CREATE INDEX payments_user_created_idx ON payments (user_id, created_at DESC);
CREATE INDEX payments_status_created_idx ON payments (status, created_at);

CREATE TABLE verification_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id uuid NOT NULL DEFAULT gen_random_uuid() UNIQUE,
    user_id uuid REFERENCES users(id) ON DELETE SET NULL,
    parcel_id uuid REFERENCES land_parcels(id) ON DELETE SET NULL,
    payment_id uuid REFERENCES payments(id) ON DELETE SET NULL,
    plot_number_query text,
    title_number_query text,
    result verification_result NOT NULL,
    sources_checked jsonb NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(sources_checked) = 'array'),
    created_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT verification_logs_query_required CHECK (
        plot_number_query IS NOT NULL OR title_number_query IS NOT NULL
    )
);

CREATE INDEX verification_logs_parcel_created_idx ON verification_logs (parcel_id, created_at DESC);
CREATE INDEX verification_logs_user_created_idx ON verification_logs (user_id, created_at DESC);
CREATE INDEX verification_logs_plot_lookup_idx ON verification_logs (lower(btrim(plot_number_query))) WHERE plot_number_query IS NOT NULL;
CREATE INDEX verification_logs_title_lookup_idx ON verification_logs (lower(btrim(title_number_query))) WHERE title_number_query IS NOT NULL;

CREATE FUNCTION set_updated_at() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

CREATE TRIGGER users_set_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER land_parcels_set_updated_at BEFORE UPDATE ON land_parcels FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER subdivisions_set_updated_at BEFORE UPDATE ON subdivisions FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER caveats_disputes_set_updated_at BEFORE UPDATE ON caveats_disputes FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER fraud_reports_set_updated_at BEFORE UPDATE ON fraud_reports FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER payments_set_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION set_updated_at();

COMMIT;