import React from "react";
import { TESTIMONIALS } from "../data/constants";

const TestimonialsSection = () => {
  return (
    <section
      className="section bg-gray-50"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header">
          <h2 id="testimonials-heading" className="section-title">
            Voices from the Field
          </h2>
          <p className="section-subtitle">
            Hear from our team members and partners about the work we do
            together
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <article key={testimonial.id} className="card">
              <div className="card-body">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={`Photo of ${testimonial.name}`}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
