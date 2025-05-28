import emailjs from "@emailjs/browser";
import { useState } from "react";
import styles from "../styles/Feedback.module.css";

const Feedback: React.FC = () => {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      await emailjs.send(
        'service_7u8dnle',
        'template_lyfr6hc',
        { email, feedback },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSent(true);
    } catch (err) {
      console.error(err);
      alert("Sorry, something went wrong. Please try again later.");
    }
  };

  if (sent) {
    return (
      <div className={styles.thankYou}>
        <h4>Thanks for your feedback!</h4>
        <button onClick={() => setSent(false)}>Send more</button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>
        Email (optional)
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>

      <label className={styles.label}>
        Feedback
        <textarea
          required
          rows={6}
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
        />
      </label>

      <button type="submit" disabled={!feedback}>
        Send
      </button>
    </form>
  );
};

export default Feedback;
