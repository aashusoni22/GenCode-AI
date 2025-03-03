import React, { useState } from "react";
import { CheckCircle, AlertCircle, ChevronRight, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const [annual, setAnnual] = useState(false);

  const toggleBilling = () => {
    setAnnual(!annual);
  };

  const plans = [
    {
      name: "Free",
      description: "Perfect for trying out DevProject Generator",
      price: 0,
      features: [
        "Generate up to 20 projects",
        "Basic project details",
        "Standard project types",
      ],
      limitations: ["No resource recommendations", "No project exporting"],
      buttonText: "Get Started",
      buttonVariant: "outline",
    },
    {
      name: "Pro",
      description: "For serious developers building their portfolio",
      price: annual ? 30 : 5,
      features: [
        "Unlimited project generation",
        "Advanced project details",
        "All project types & industries",
        "Detailed resource recommendations",
        "Export projects as PDF or markdown",
        "Priority support",
      ],
      popular: true,
      buttonText: "Upgrade to Pro",
      buttonVariant: "solid",
    },
    {
      name: "Team",
      description: "For bootcamps and development teams",
      price: annual ? 75 : 15,
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Project sharing",
        "Custom project types",
        "Analytics dashboard",
        "Dedicated support",
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline",
    },
  ];

  return (
    <div className="bg-black min-h-screen font-primary pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your <span className="text-secondary">Plan</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Generate the perfect projects for your portfolio with DevProject
            Generator
          </p>
        </div>

        {/* Billing toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-900 p-2 rounded-lg inline-flex items-center">
            <span
              className={`px-4 py-2 rounded-md cursor-pointer ${
                !annual
                  ? "bg-secondary text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </span>
            <span
              className={`px-4 py-2 rounded-md cursor-pointer ${
                annual
                  ? "bg-secondary text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setAnnual(true)}
            >
              Yearly{" "}
              <span className="text-xs bg-purple-800 px-2 py-0.5 rounded-full ml-1">
                Save 33%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-gray-900 rounded-xl overflow-hidden border ${
                plan.popular
                  ? "border-secondary shadow-lg shadow-purple-900/20"
                  : "border-gray-800"
              }`}
            >
              {plan.popular && (
                <div className="bg-secondary text-center py-1.5 text-sm font-medium text-white">
                  Most Popular
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1">
                  {plan.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">
                    ${plan.price}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-gray-400 ml-1">
                      /{annual ? "year" : "month"}
                    </span>
                  )}
                </div>

                <Link
                  to={plan.name === "Free" ? "/generate" : "/signup"}
                  className={`w-full block text-center py-3 rounded-lg transition-all mb-6 ${
                    plan.buttonVariant === "solid"
                      ? "bg-secondary hover:bg-secondary/80 text-white"
                      : "border border-secondary text-white hover:bg-secondary/80 hover:bg-opacity-20"
                  }`}
                >
                  {plan.buttonText}
                </Link>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-300 border-b border-gray-800 pb-2">
                    What's included:
                  </h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start text-sm text-gray-300"
                      >
                        <CheckCircle
                          className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}

                    {plan.limitations &&
                      plan.limitations.map((limitation) => (
                        <li
                          key={limitation}
                          className="flex items-start text-sm text-gray-500"
                        >
                          <AlertCircle
                            className="h-5 w-5 text-gray-600 mr-2 flex-shrink-0"
                            aria-hidden="true"
                          />
                          {limitation}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <div className="bg-gray-900 rounded-lg p-5">
              <h3 className="text-white font-medium mb-2">
                What happens after I use all 20 free projects?
              </h3>
              <p className="text-gray-400 text-sm">
                You'll still be able to access and view your previously
                generated projects, but you'll need to upgrade to a paid plan to
                generate new ones.
              </p>
            </div>

            <div className="bg-gray-900 rounded-lg p-5">
              <h3 className="text-white font-medium mb-2">
                Can I cancel my subscription anytime?
              </h3>
              <p className="text-gray-400 text-sm">
                Yes, you can cancel your subscription at any time. You'll
                continue to have access to Pro features until the end of your
                billing period.
              </p>
            </div>

            <div className="bg-gray-900 rounded-lg p-5">
              <h3 className="text-white font-medium mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-400 text-sm">
                We accept all major credit cards including Visa, Mastercard, and
                American Express. We also support payments via PayPal.
              </p>
            </div>

            <div className="bg-gray-900 rounded-lg p-5">
              <h3 className="text-white font-medium mb-2">
                Is there a refund policy?
              </h3>
              <p className="text-gray-400 text-sm">
                We offer a 14-day money-back guarantee. If you're not satisfied
                with the service, contact our support team within 14 days of
                purchase for a full refund.
              </p>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-16 text-center">
          <div className="flex justify-center items-center space-x-8 mb-4">
            <div className="flex items-center text-gray-400">
              <Shield className="w-5 h-5 mr-1" />
              <span className="text-sm">Secure Payment</span>
            </div>
            <div className="flex items-center text-gray-400">
              <CheckCircle className="w-5 h-5 mr-1" />
              <span className="text-sm">14-day Money Back</span>
            </div>
            <div className="flex items-center text-gray-400">
              <ChevronRight className="w-5 h-5 mr-1" />
              <span className="text-sm">Cancel Anytime</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm">
            Need help choosing a plan? Contact us at{" "}
            <a
              href="mailto:support@devprojectgen.com"
              className="text-purple-400 hover:text-purple-300"
            >
              support@devprojectgen.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
