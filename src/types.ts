export interface LaunchType {
  flight_number: number
  mission_name: string
  mission_id: string[]
  upcoming: boolean
  launch_year: string
  launch_date_unix: number
  launch_date_utc: Date
  launch_date_local: Date
  is_tentative: boolean
  tentative_max_precision: string
  tbd: boolean
  launch_window: number | null
  rocket: RocketType
  ships: string[]
  telemetry: Telemetry
  launch_site: LaunchSite
  launch_success: boolean | null
  launch_failure_details?: LaunchFailureDetails
  links: Links
  details: null | string
  static_fire_date_utc: Date | null
  static_fire_date_unix: number | null
  timeline: { [key: string]: number } | null
}

export interface LaunchFailureDetails {
  time: number
  altitude: number | null
  reason: string
}

export interface LaunchSite {
  site_id: string
  site_name: string
  site_name_long: string
}

export interface Links {
  mission_patch: null | string
  mission_patch_small: null | string
  reddit_campaign: null | string
  reddit_launch: null | string
  reddit_recovery: null | string
  reddit_media: null | string
  presskit: null | string
  article_link: null | string
  wikipedia: null | string
  video_link: null | string
  youtube_id: null | string
  flickr_images: string[]
}

export interface RocketType {
  rocket_id: string
  rocket_name: string
  rocket_type: string
  first_stage: FirstStage
  second_stage: SecondStage
  fairings: Fairings | null
}

export interface Fairings {
  reused: boolean
  recovery_attempt: boolean | null
  recovered: boolean | null
  ship: null | string
}

export interface FirstStage {
  cores: Core[]
}

export interface Core {
  core_serial: null | string
  flight: number | null
  block: number | null
  gridfins: boolean | null
  legs: boolean | null
  reused: boolean | null
  land_success: boolean | null
  landing_intent: boolean | null
  landing_type: null | string
  landing_vehicle: null | string
}

export interface SecondStage {
  block: number | null
  payloads: Payload[]
}

export interface Payload {
  payload_id: string
  norad_id: number[]
  reused: boolean
  customers: string[]
  nationality?: string
  manufacturer?: null | string
  payload_type: string
  payload_mass_kg: number | null
  payload_mass_lbs: number | null
  orbit: string
  orbit_params: OrbitParams
  cap_serial?: null | string
  mass_returned_kg?: number | null
  mass_returned_lbs?: number | null
  flight_time_sec?: number | null
  cargo_manifest?: null | string
}

export interface OrbitParams {
  reference_system: null | string
  regime: null | string
  longitude: number | null
  semi_major_axis_km: number | null
  eccentricity: number | null
  periapsis_km: number | null
  apoapsis_km: number | null
  inclination_deg: number | null
  period_min: number | null
  lifespan_years: number | null
  epoch: Date | null
  mean_motion: number | null
  raan: number | null
  arg_of_pericenter?: number | null
  mean_anomaly?: number | null
}

export interface Telemetry {
  flight_club: null | string
}
