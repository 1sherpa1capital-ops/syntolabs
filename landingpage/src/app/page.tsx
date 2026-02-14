"use client";


import Link from "next/link";
import Image from "next/image";
import { HeroBackground } from "@/components/hero-background";
import { FloatingCTA } from "@/components/floating-cta";
import { CalProvider, openCalModal, getCalLink } from "@/components/cal-provider";
import { ContactForm } from "@/components/contact-form";

import { BookingProvider } from "@/context/booking-context";
import { BookingToasts } from "@/components/booking-toasts";
import { Disclosure, DisclosureButton, DisclosurePanel, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <CalProvider>
      <BookingProvider>
        <div className="min-h-screen bg-black text-white font-sans">
          {/* Floating Navigation */}
          <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center gap-4 px-6 py-3 bg-black/60 backdrop-blur-xl border border-zinc-800/50 rounded-full">
              <Link href="/" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
                <Image src="/logo.svg" alt="Synto Labs" width={24} height={24} />
                <span className="text-sm font-medium tracking-tight text-zinc-400">SYNTO LABS</span>
              </Link>
              <button
                onClick={() => openCalModal(getCalLink('discovery'))}
                className="text-sm font-medium px-4 py-2 bg-white text-black hover:bg-zinc-200 transition-all duration-200 rounded-full cursor-pointer"
              >
                Apply
              </button>
            </div>
          </nav>

          {/* Hero */}
          <section className="min-h-[85vh] flex items-center justify-center relative overflow-hidden">
            <HeroBackground />

            {/* Ambient light overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none z-5" />

            <div className="max-w-3xl mx-auto text-center px-6 relative z-10">
              <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6 leading-tight text-white">
                Stop doing robot work
              </h1>

              <p className="text-lg md:text-xl text-zinc-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Your team spends 15+ hours every week on tasks that should be automated. We build custom AI agents that handle it—starting in 48 hours.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <button
                  onClick={() => openCalModal(getCalLink('discovery'))}
                  className="btn-double text-base cursor-pointer"
                >
                  Book a free audit
                </button>
                <a
                  href="#how-it-works"
                  className="btn-double-secondary text-base"
                >
                  See how it works
                </a>
              </div>

              <p className="text-sm text-zinc-500 mt-8">
                10,000+ hours saved for clients. 48-hour delivery.
              </p>
            </div>
          </section>

          {/* How It Works - Headless UI Tabs */}
          <section id="how-it-works" className="py-32">
            <div className="mx-auto max-w-4xl px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-white">Three ways to work together</h2>
                <p className="text-lg text-zinc-400">Pick what fits your situation</p>
              </div>

              <TabGroup>
                <TabList className="flex gap-2 p-1 bg-zinc-900/50 rounded-full w-fit mx-auto mb-12">
                  <Tab className={({ selected }) =>
                    `px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-200 outline-none ${selected ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`
                  }>
                    Automate Ops
                  </Tab>
                  <Tab className={({ selected }) =>
                    `px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-200 outline-none ${selected ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`
                  }>
                    Partner Up
                  </Tab>
                  <Tab className={({ selected }) =>
                    `px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-200 outline-none ${selected ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`
                  }>
                    Build Product
                  </Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <div className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-2xl">
                      <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-white">Automate your operations</h3>
                      <p className="text-base text-zinc-400 leading-relaxed mb-6">
                        Stop paying people to do work that should be automated. We find the tasks eating your team's time and build AI agents that handle them—forever.
                      </p>
                      <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-3 text-zinc-300">
                          <span className="text-emerald-400">✓</span>
                          Free audit—we show you exactly what's costing you
                        </li>
                        <li className="flex items-center gap-3 text-zinc-300">
                          <span className="text-emerald-400">✓</span>
                          Working prototype in 48 hours
                        </li>
                        <li className="flex items-center gap-3 text-zinc-300">
                          <span className="text-emerald-400">✓</span>
                          You own everything—we don't lock you in
                        </li>
                      </ul>
                      <button
                        onClick={() => openCalModal(getCalLink('discovery'))}
                        className="btn-double text-sm inline-block cursor-pointer"
                      >
                        Get your free audit
                      </button>
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-2xl">
                      <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-white">Co-build AI products</h3>
                      <p className="text-base text-zinc-400 leading-relaxed mb-6">
                        You have the expertise. We have the builders. Together we create AI products you can sell, white-label, or use internally—no hiring a dev team.
                      </p>
                      <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-3 text-zinc-300">
                          <span className="text-emerald-400">✓</span>
                          You own the IP—we're just the builders
                        </li>
                        <li className="flex items-center gap-3 text-zinc-300">
                          <span className="text-emerald-400">✓</span>
                          Shared revenue if you want
                        </li>
                        <li className="flex items-center gap-3 text-zinc-300">
                          <span className="text-emerald-400">✓</span>
                          No handoffs—we stay for the long haul
                        </li>
                      </ul>
                      <button
                        onClick={() => openCalModal(getCalLink('product-consult'))}
                        className="btn-double text-sm inline-block cursor-pointer"
                      >
                        Let's build something
                      </button>
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-2xl">
                      <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-white">AI Products</h3>
                      <p className="text-base text-zinc-400 leading-relaxed mb-6">
                        We build standalone AI products that you can white-label, resell, or use internally.
                        From idea to launch in weeks, not months.
                      </p>
                      <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-3 text-zinc-300">
                          <span className="text-emerald-400">✓</span>
                          Custom AI agents
                        </li>
                        <li className="flex items-center gap-3 text-zinc-300">
                          <span className="text-emerald-400">✓</span>
                          Workflow automation tools
                        </li>
                        <li className="flex items-center gap-3 text-zinc-300">
                          <span className="text-emerald-400">✓</span>
                          Full IP transfer
                        </li>
                      </ul>
                      <button
                        onClick={() => openCalModal(getCalLink('product-consult'))}
                        className="btn-double text-sm inline-block cursor-pointer"
                      >
                        Build my product
                      </button>
                    </div>
                  </TabPanel>
                </TabPanels>
              </TabGroup>
            </div>
          </section>

          {/* Why Automate */}
          <section className="py-32">
            <div className="mx-auto max-w-3xl px-6">
              <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-white">The cost of waiting</h2>

              <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl mb-8">
                Every week you don't automate is a week your competitors get ahead.
              </p>

              <p className="text-base text-zinc-500 leading-relaxed max-w-3xl">
                Most companies know they need AI. They don't know where to start—and that's exactly why they're losing to companies who moved first.
                <br /><br />
                We find your bottlenecks, build systems that eliminate them, and make sure they actually work. That's it.
              </p>
            </div>
          </section>

          {/* Why Partner */}
          <section className="py-32">
            <div className="mx-auto max-w-3xl px-6">
              <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-white">
                We're not for everyone
              </h2>

              <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl mb-8">
                You can hire developers anywhere. What you can't hire is someone who treats your company like their own—because our reputation depends on it actually working.
              </p>

              <p className="text-base text-zinc-500 leading-relaxed max-w-3xl">
                We don't take every deal. We take the ones we'd bet 10+ years of our lives on.
              </p>
            </div>
          </section>

          {/* Pricing */}
          <section id="pricing" className="py-32">
            <div className="mx-auto max-w-6xl px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-white">Simple pricing</h2>
                <p className="text-lg text-zinc-400">One price. Everything included. No surprises.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Starter */}
                <div className="group relative p-8 bg-zinc-900/30 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all duration-300">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-2">Starter</h3>
                    <p className="text-sm text-zinc-500">Perfect for testing the waters</p>
                  </div>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-white">$2.5K</span>
                    <span className="text-zinc-500 ml-2">- $4K</span>
                  </div>
                  <p className="text-sm text-zinc-400 mb-6">48-hour delivery. See if AI automation works for your business.</p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-sm text-zinc-300">
                      <span className="text-emerald-400">✓</span>
                      1-3 workflow automations
                    </li>
                    <li className="flex items-center gap-3 text-sm text-zinc-300">
                      <span className="text-emerald-400">✓</span>
                      Working prototype in 48 hours
                    </li>
                    <li className="flex items-center gap-3 text-sm text-zinc-300">
                      <span className="text-emerald-400">✓</span>
                      Verification guardrails
                    </li>
                    <li className="flex items-center gap-3 text-sm text-zinc-300">
                      <span className="text-emerald-400">✓</span>
                      30-day support
                    </li>
                    <li className="flex items-center gap-3 text-sm text-zinc-300">
                      <span className="text-emerald-400">✓</span>
                      Slack integration
                    </li>
                  </ul>
                  <button
                    onClick={() => openCalModal(getCalLink('discovery'))}
                    className="block w-full py-3.5 text-center border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-600 hover:text-white transition-all duration-200 rounded-full font-medium cursor-pointer"
                  >
                    Get Started
                  </button>
                </div>

                {/* Professional */}
                <div className="group relative p-8 bg-zinc-900/60 border-2 border-emerald-500/50 rounded-2xl hover:border-emerald-500 transition-all duration-300 scale-105 shadow-[0_0_40px_rgba(16,185,129,0.1)]">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-500 text-black text-xs font-semibold rounded-full">
                    MOST POPULAR
                  </div>
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-2">Professional</h3>
                    <p className="text-sm text-zinc-500">For serious automation needs</p>
                  </div>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-white">$5K</span>
                    <span className="text-zinc-500 ml-2">- $7.5K</span>
                  </div>
                  <p className="text-sm text-zinc-400 mb-6">Three workflows. Real impact. Most clients start here.</p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-sm text-zinc-300">
                      <span className="text-emerald-400">✓</span>
                      4-7 workflow automations
                    </li>
                    <li className="flex items-center gap-3 text-sm text-zinc-300">
                      <span className="text-emerald-400">✓</span>
                      Priority 48-hour build
                    </li>
                    <li className="flex items-center gap-3 text-sm text-zinc-300">
                      <span className="text-emerald-400">✓</span>
                      Advanced verification
                    </li>
                    <li className="flex items-center gap-3 text-sm text-zinc-300">
                      <span className="text-emerald-400">✓</span>
                      60-day support
                    </li>
                    <li className="flex items-center gap-3 text-sm text-zinc-300">
                      <span className="text-emerald-400">✓</span>
                      Custom integrations
                    </li>
                    <li className="flex items-center gap-3 text-sm text-zinc-300">
                      <span className="text-emerald-400">✓</span>
                      API connections
                    </li>
                  </ul>
                  <button
                    onClick={() => openCalModal(getCalLink('sales-call'))}
                    className="block w-full py-3.5 text-center bg-emerald-500 text-black hover:bg-emerald-400 transition-all duration-200 rounded-full font-medium shadow-lg shadow-emerald-500/20 cursor-pointer"
                  >
                    Get Started
                  </button>
                </div>

                {/* Enterprise */}
                <div className="group relative p-8 bg-zinc-900/30 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all duration-300">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-2">Enterprise</h3>
                    <p className="text-sm text-zinc-500">Full operations. No limits.</p>
                  </div>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-white">$10K</span>
                    <span className="text-zinc-500 ml-2">- $25K+</span>
                  </div>
                  <p className="text-sm text-zinc-400 mb-6">Unlimited workflows. Dedicated team. Complete transformation.</p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-sm text-zinc-300">
                      <span className="text-emerald-400">✓</span>
                      8-15+ workflow automations
                    </li>
                    <li className="flex items-center gap-3 text-sm text-zinc-300">
                      <span className="text-emerald-400">✓</span>
                      Voice AI agent
                    </li>
                    <li className="flex items-center gap-3 text-sm text-zinc-300">
                      <span className="text-emerald-400">✓</span>
                      Dedicated developer
                    </li>
                    <li className="flex items-center gap-3 text-sm text-zinc-300">
                      <span className="text-emerald-400">✓</span>
                      90-day support
                    </li>
                    <li className="flex items-center gap-3 text-sm text-zinc-300">
                      <span className="text-emerald-400">✓</span>
                      Custom everything
                    </li>
                    <li className="flex items-center gap-3 text-sm text-zinc-300">
                      <span className="text-emerald-400">✓</span>
                      SLA guarantee
                    </li>
                  </ul>
                  <button
                    onClick={() => openCalModal(getCalLink('partner-up'))}
                    className="block w-full py-3.5 text-center border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-600 hover:text-white transition-all duration-200 rounded-full font-medium cursor-pointer"
                  >
                    Contact Us
                  </button>
                </div>
              </div>

              <p className="text-center text-zinc-500 mt-12 text-sm">
                All prices one-time. No monthly fees. Final price depends on complexity.
                <br />
                Optional $200/mo for ongoing support.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-32">
            <div className="mx-auto max-w-3xl px-6">
              <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-white">Questions?</h2>
              <p className="text-xl text-zinc-400 mb-8 max-w-3xl">We have answers.</p>

              <div className="space-y-3 mt-12">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex w-full justify-between items-center py-4 px-5 text-left bg-zinc-900/50 hover:bg-zinc-800 rounded-xl transition-colors duration-200">
                        <span className="text-base font-medium text-zinc-200">How is this different from a dev shop?</span>
                        <ChevronDownIcon className={`w-5 h-5 text-emerald-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                      </DisclosureButton>
                      <DisclosurePanel className="px-5 py-4 text-base text-zinc-400">
                        Most agencies build to spec and move on. We embed as your AI team and stay.
                        We treat your business like our own because our reputation depends on it actually working.
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>

                <Disclosure>
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex w-full justify-between items-center py-4 px-5 text-left bg-zinc-900/50 hover:bg-zinc-800 rounded-xl transition-colors duration-200">
                        <span className="text-base font-medium text-zinc-200">What if I don't know what I need yet?</span>
                        <ChevronDownIcon className={`w-5 h-5 text-emerald-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                      </DisclosureButton>
                      <DisclosurePanel className="px-5 py-4 text-base text-zinc-400">
                        We audit your operations for free. You'll get a prioritized list of what's costing you the most time and money.
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>

                <Disclosure>
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex w-full justify-between items-center py-4 px-5 text-left bg-zinc-900/50 hover:bg-zinc-800 rounded-xl transition-colors duration-200">
                        <span className="text-base font-medium text-zinc-200">How fast do you ship?</span>
                        <ChevronDownIcon className={`w-5 h-5 text-emerald-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                      </DisclosureButton>
                      <DisclosurePanel className="px-5 py-4 text-base text-zinc-400">
                        48 hours to working prototype for most projects. Complex builds may take longer—you'll know upfront before we start.
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>

                <Disclosure>
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex w-full justify-between items-center py-4 px-5 text-left bg-zinc-900/50 hover:bg-zinc-800 rounded-xl transition-colors duration-200">
                        <span className="text-base font-medium text-zinc-200">What kind of businesses do you work with?</span>
                        <ChevronDownIcon className={`w-5 h-5 text-emerald-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                      </DisclosureButton>
                      <DisclosurePanel className="px-5 py-4 text-base text-zinc-400">
                        SaaS, e-commerce, professional services, real estate, agencies, fintech. If you have repetitive workflows, we can automate them.
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>

                <Disclosure>
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex w-full justify-between items-center py-4 px-5 text-left bg-zinc-900/50 hover:bg-zinc-800 rounded-xl transition-colors duration-200">
                        <span className="text-base font-medium text-zinc-200">What happens after the build?</span>
                        <ChevronDownIcon className={`w-5 h-5 text-emerald-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                      </DisclosureButton>
                      <DisclosurePanel className="px-5 py-4 text-base text-zinc-400">
                        You own the automation. It keeps running. Optional ongoing support at $200/mo if you want us to keep improving it.
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              </div>
            </div>
          </section>



          {/* Contact Form */}
          <section id="contact" className="py-32 bg-zinc-950">
            <div className="mx-auto max-w-md px-6">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-white text-center">
                Get in touch
              </h2>
              <p className="text-zinc-400 mb-12 text-center">
                Send us a message and we'll get back to you within 24 hours.
              </p>
              <ContactForm />
            </div>
          </section>

          {/* Apply */}
          <section id="apply" className="py-32">
            <div className="mx-auto max-w-3xl px-6 text-center">
              <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-white">
                Get ahead or get left behind.
              </h2>
              <p className="text-xl text-zinc-400 mb-12 max-w-3xl">
                Two ways in. One call to find out which.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                <button
                  onClick={() => openCalModal(getCalLink('sales-call'))}
                  className="btn-double text-base cursor-pointer"
                >
                  FIX MY OPERATIONS
                </button>
                <a
                  href="#pricing"
                  className="btn-double-secondary text-base"
                >
                  VIEW PRICING
                </a>
              </div>

              <p className="text-sm text-zinc-500 mt-8">
                <a href="mailto:hello@syntolabs.xyz" className="hover:text-white underline">
                  hello@syntolabs.xyz
                </a>
              </p>
            </div>
          </section>

          {/* Footer */}
          <footer className="px-6 py-12 mx-auto max-w-6xl border-t border-zinc-900">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <Link href="/" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
                <Image src="/logo.svg" alt="Synto Labs" width={24} height={24} />
                <span className="text-xs text-zinc-500">SYNTO LABS</span>
              </Link>
              <div className="text-sm text-zinc-500">
                © 2026 Synto Labs. All rights reserved.
              </div>
            </div>
          </footer>

          <FloatingCTA />
        </div>
        <BookingToasts />
      </BookingProvider>
    </CalProvider>
  );
}
