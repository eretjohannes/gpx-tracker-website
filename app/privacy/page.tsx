import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy — GPX Tracker",
};

export default function PrivacyPage() {
  return (
    <article className="page">
      <h1>Privacy</h1>
      <p>
        Location stays on this phone and is only used to put you on the map while
        the app is open. We do not have an account system, and we do not upload
        your rides.
      </p>
      <p>
        Country GPX files download from the official Trans Euro Trail website to
        this device. This app does not re-host those files.
      </p>
      <p>
        The live map is Apple Maps. Apple does not let third-party apps store
        those tiles, so an offline download saves a corridor of OpenStreetMap /
        OpenTopoMap tiles along the section you choose. This app does not use
        Mapbox.
      </p>
      <p>
        If you buy a coffee, Apple processes the payment. We only learn that the
        tip succeeded — not your card details.
      </p>
      <p>There is no analytics SDK and no advertising.</p>
    </article>
  );
}
