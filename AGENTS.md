# GoFamExplore Website Agent Guide

Read this guide before changing the website, galleries, travel map, or content. It records confirmed requirements and current repository facts so work can continue across agent sessions. Keep this file up to date when the user confirms new decisions.

## Project

This repository is a static website for the GoFamExplore family. The intended experience must work on desktop and smartphone screens. Keep implementation static HTML, CSS, and JavaScript unless the user asks to change that constraint. Prefer the existing visual language and local assets over introducing a framework or replacing the design wholesale.

The initial implementation now exists: root `index.html` is the GoFamExplore home, with shared `styles.css` and separate `truck.html` and `carl.html` pages. Route/photo manifest data and full Carl content migration are still pending.

## Confirmed Site Structure

- Root `index.html` is to become the GoFamExplore home. It covers family travel, places visited, photo galleries, wingfoiling, mountain biking, and events the family hosts.
- Create a Truck area/page for the truck and its build/specifications.
- Create a Carl area/page for Carl's portfolio photos and events. Keep Carl's profile, gallery, competition results/events, and equipment setup together on the Carl page; do not split them into separate Carl pages unless the user changes this decision.
- Provide consistent navigation among GoFamExplore, Truck, and Carl. Keep navigation usable at phone widths; do not hide the only way to reach an area on small screens.
- Keep the Instagram link `https://www.instagram.com/gofamexplore/` visible in the top navigation on every page, labeled `Instagram @gofamexplore`, and preserve its `noopener noreferrer` external-link protection.
- Use `assets/GoFamExplore_script_logo_vinyl.svg` as the linked website logo in the top navigation on every page. Keep meaningful alt text and preserve the responsive logo sizing in `styles.css`.
- Travel destinations, hosted-event descriptions, and truck model/build/specification details must come from the user or an existing reliable project source. Never invent facts. Mark missing details as pending or ask the user.
- The root `events/` directory contains the event image and matching text description. The verified pair `weekly kids and family meetup in la ventana.txt` and `.png` describes a family/kids wingfoil meetup at Playa Central Launch Spot every Friday at 4:00 PM, followed by a kids dance party at 6:30 PM with DJ EquisBoquis. Treat the text file as authoritative.
- The verified travel-photo manifest is `assets/family/travels/photo-manifest.json`. It records EXIF GPS coordinates for all four current travel JPEGs: `IMG_4106.JPEG` at 24.6273056,-82.8720333; `IMG_7957.JPEG` at 37.6224222,-112.1663972; `IMG_9538.JPEG` at 41.3735861,-124.0135944; and `IMG_9585.JPEG` at 41.3737528,-124.0135500. Keep coordinates tied to the source filenames and do not replace them with inferred names.

## Travel Map Requirements

- The GoFamExplore home will show a map limited to North America, with the family's GPS tracks drawn on it.
- Use Leaflet with online OpenStreetMap tiles as the agreed direction. Keep required OpenStreetMap attribution visible. The basemap requires an internet connection; route and photo source data should remain local to the site.
- Travel GPS sources are under `assets/family/travels/gpslogger/`. The folder contains date-named `.gpx`, `.kml`, and `.zip` files; some dates have multiple formats. There is also a `gpslogger_test.xml` test artifact, not a track to display.
- Use GPX, KML, and GPX content inside ZIP archives as candidate route sources. Same-date filenames do not prove that files are duplicates. Compare their timestamps and route geometry before deduplicating; retain distinct segments even if recorded on the same date.
- Keep original GPS files unchanged. If map rendering or payload size becomes a problem, generate separate optimized display data by simplifying points or grouping tracks. Never replace the source files with simplified output.
- Track locations should be displayed as recorded per the current user decision. Do not silently mask, trim, fuzz, or otherwise alter route locations. Be clear that published tracks expose the recorded route; ask before changing that behavior.
- Travel photos are stored under `assets/family/travels/pictures/`. Use embedded GPS/EXIF metadata for map placement. Only geotagged photos appear on the map; photos without location metadata may still appear in the gallery.
- Cluster nearby photo markers into mini previews. Clicking a cluster should zoom in and reveal its photos; clicking a photo preview should open a larger image. Make these controls keyboard-accessible and provide meaningful accessible names.
- Because this is a static site, do not rely on server directory listing at runtime. Generate or maintain an explicit local manifest/GeoJSON for map routes and geotagged photos, and document how it is refreshed when source assets change.

## Asset And Gallery Practices

- Preserve user-provided source assets. Do not delete or overwrite GPS logs, photos, or archives to remove duplicates; omit confirmed duplicates from generated display data instead.
- Use descriptive, URL-safe filenames and relative paths for new web assets. Existing folder names and filenames may contain spaces or mixed case; match exact casing in references.
- The current `index.html` embeds several JPEGs as base64 data URLs. When rebuilding it, extract photos to descriptive files in the appropriate asset folder, update image references, and verify every image loads. Do not copy the enormous data URLs into new pages.
- Inspect image metadata before assigning map locations. Do not infer a photo's GPS location from its filename or visual content.
- Gallery photos should have useful alt text based on known content. Do not fabricate people, locations, or events that cannot be confirmed.

## Content Migration Notes

The current root page contains Carl's profile, stats, competition highlights, skills/progression, team-rider pitch, gear setup, a family-travel/support banner, and a family-adventure gallery. On the redesign, move the family banner/gallery and family travel/activity content to the GoFamExplore home. Move Carl-specific content to the Carl page. Reuse existing factual Carl copy/results when appropriate, and verify details before changing time-sensitive claims.

Existing visual conventions include an ink/white/gold palette, responsive layouts, and a max-width content wrapper. Preserve the design system's useful contrast and responsive behavior while correcting issues such as the current mobile navigation hiding several links.

## Working And Verification Rules

- Inspect the current files and git working tree before editing. Preserve user changes; do not reset, clean, or overwrite unrelated work.
- Keep changes scoped and static-host friendly. Use semantic HTML, responsive CSS, descriptive titles/descriptions, accessible focus states, and working relative links.
- After changing route processing, validate generated GeoJSON/manifest structure and check representative routes from each source format. Confirm true duplicates do not render twice and distinct same-day tracks remain.
- After changing photo processing, verify metadata-derived coordinates, missing-metadata behavior, thumbnail/full-size links, and marker clustering.
- Test every page at phone, tablet, and desktop widths. Check for horizontal overflow, clipped text, overlapping content, visible map attribution, and usable keyboard controls.
- If adding trip details, hosted events, or truck specifications, cite/derive them from user-provided facts or existing project content; otherwise leave a clear placeholder or ask.

## Pending Inputs

- Specific travel destinations and trip descriptions.
- Additional details and dates for events GoFamExplore hosts beyond the verified weekly meetup.
- Truck model, specifications, build stages, and technical details.
- Any preferred names/descriptions for map stops or GPS recordings beyond their date-based filenames.
- Text extraction from `assets/truck/Portfolio.pdf`; local EXIF extraction is complete for the four current travel JPEGs and is recorded in `assets/family/travels/photo-manifest.json`.