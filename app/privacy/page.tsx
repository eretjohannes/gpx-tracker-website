import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy — GPX Tracker",
};

export default function PrivacyPage() {
  return (
    <article className="page">
      <h1>Privacy</h1>
      <p>
        GPX Tracker is for motorcycle enthusiasts riding the Trans Euro Trail
        or following GPX trails of their own. There are no accounts, no cloud
        for your rides, and no ads or tracking in the app.
      </p>

      <h2>Location</h2>
      <p>
        If you allow location, the app uses it while it is open to put you on
        the map and show speed. Nothing is recorded as a trip and nothing is
        uploaded — you can refuse permission and still download tracks, import
        a GPX, and use the rest of the app, or change it later in iOS
        Settings.
      </p>

      <h2>What stays on the phone</h2>
      <p>
        Official Trans Euro Trail country files come straight from{" "}
        <a href="https://transeurotrail.org/">transeurotrail.org</a> onto the
        phone; the app does not re-host them. Anything you import stays on the
        device as well, and an offline map download saves OpenStreetMap /
        OpenTopoMap tiles along the section you pick. Delete the download, or
        the app, and that data is gone.
      </p>

      <h2>Maps and weather</h2>
      <p>
        The live map is Apple Maps, so Apple is the one serving those tiles.
        If you ask for a road to a point on the trail, Apple gets the start
        and end so it can draw the route. Weather on a track comes from
        Open-Meteo, using a point at the start of that track rather than a
        live feed of where you are.
      </p>

      <h2>Tips</h2>
      <p>
        The coffee tip is an App Store purchase, so Apple takes the payment
        and card details stay with Apple.
      </p>

      <h2>This site and email</h2>
      <p>
        This site is only these pages, though the host may keep ordinary
        server logs.         If you write to{" "}
        <a href="mailto:contact@johanneseret.com">contact@johanneseret.com</a>,
        the message is only used to reply, and the thread will be deleted if
        you ask.
      </p>

      <p className="note">Johannes Eret · 9 September 2026</p>
    </article>
  );
}
