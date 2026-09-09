import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support — GPX Tracker",
};

export default function SupportPage() {
  return (
    <article className="page">
      <h1>Support</h1>
      <p>
        GPX Tracker is a free, unofficial app for motorcycle GPX navigation.
        Questions, ideas, and bug reports are welcome.
      </p>
      <p>
        Email{" "}
        <a href="mailto:contact@johanneseret.com">contact@johanneseret.com</a>.
      </p>
    </article>
  );
}
