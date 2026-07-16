import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";

const initialForm = {
    name: "",
    email: "",
    message: ""
};

export default function ContactForm() {
    const [form, setForm] = useState(initialForm);
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setStatus("loading");
        setError("");

        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    name: form.name,
                    email: form.email,
                    message: form.message,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            setStatus("success");
            setForm(initialForm);

            setTimeout(() => {
                setStatus("idle");
            }, 4000);

        } catch (err) {
            console.error(err);

            setStatus("error");
            setError("Failed to send message. Please try again.");

            setTimeout(() => {
                setStatus("idle");
            }, 4000);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="contact-form">

            <div className="field">
                <label htmlFor="name">
                    Name
                </label>

                <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                />
            </div>


            <div className="field">
                <label htmlFor="email">
                    Email
                </label>

                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                />
            </div>


            <div className="field">
                <label htmlFor="message">
                    Message
                </label>

                <textarea
                    id="message"
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows="5"
                />
            </div>


            {status === "error" && (
                <p className="form-error">
                    {error}
                </p>
            )}


            {status === "success" && (
                <p className="form-success">
                    Message sent — I'll get back to you soon.
                </p>
            )}


            <button
                type="submit"
                className="btn btn-primary"
                disabled={status === "loading"}
            >
                {status === "loading" ? (
                    <>
                        <Loader2
                            size={16}
                            className="spin"
                        />
                        Sending...
                    </>
                ) : (
                    <>
                        <Send size={16} />
                        Send message
                    </>
                )}
            </button>

        </form>
    );
}