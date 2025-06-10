import nodemailer from "nodemailer";

interface Testimonial {
    name: string;
    email: string;
    phone: string;
    comment: string;
    rate: number;
}

export async function receiveContactEmail(testimonial: Testimonial, domain: string, email: string) {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER!,
            pass: process.env.EMAIL_PASS!,
        },
    });

    console.log(email);
    

    await transporter.sendMail({
        from: `${process.env.EMAIL_USER}`,
        to: email,
        subject: "New Testimonial Received",
        html: `
    <h2>New Testimonial Submission</h2>
    <p><strong>Name:</strong> ${testimonial.name}</p>
    <p><strong>Email:</strong> ${testimonial.email}</p>
    <p><strong>Phone:</strong> ${testimonial.phone}</p>
    <p><strong>Comment:</strong> ${testimonial.comment}</p>
    <p><strong>Rate:</strong> ${testimonial.rate}</p>
    <a href="https://${domain}/testimonials">View Testimonials</a>
  `,
    });
}
