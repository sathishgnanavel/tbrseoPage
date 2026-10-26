import { renderToString } from "react-dom/server";
import { create } from "zustand";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useRef } from "react";
//#region src/data/app.ts
/**
* Single source of truth for every fact shown on the page and in the schema.org markup.
* Values come from the Google Play and Apple App Store listings (checked 15 Oct 2026).
*/
var SITE_URL = "https://threebestrated.com";
var PAGE_URL = `${SITE_URL}/download`;
var APP = {
	name: "ThreeBestRated",
	fullName: "ThreeBestRated: local experts",
	developer: "Signature Profit LLC",
	website: "https://threebestrated.com",
	privacyUrl: "https://threebestrated.com/privacy-policy",
	supportEmail: "support@threebestrated.com",
	phone: "+1 888-551-1667",
	address: "311 Ranch Road 620 S Ste 211, Lakeway, TX 78734-4776, United States",
	since: 2014,
	stats: {
		monthlyUsers: "5M+",
		businesses: "500,000+",
		cities: "200+",
		categories: "200+",
		countries: 8
	},
	countries: [
		"United States",
		"Canada",
		"United Kingdom",
		"Australia",
		"India",
		"Singapore",
		"Germany",
		"France"
	],
	languages: [
		"English",
		"German",
		"French",
		"Hindi"
	],
	inspectionAreas: [
		"Reputation",
		"History",
		"Complaints",
		"Ratings",
		"Proximity",
		"Satisfaction",
		"Trust",
		"Cost",
		"Reviews",
		"Excellence"
	],
	iconUrl: "https://play-lh.googleusercontent.com/vPucNwPbS2uPd1JeCLVdJbSvdYX6Fr1zd3A8A964JWxe3iZh4JngCsn7QjiXPLDJNe0N7bitt6Axq6oH_sUszA"
};
var STORES = {
	android: {
		id: "android",
		label: "Android",
		storeName: "Google Play",
		url: "https://play.google.com/store/apps/details?id=com.allcountries.threebestrated",
		rating: 4.5,
		ratingCount: 117,
		ratingNoun: "reviews",
		specs: [
			{
				label: "Rating",
				value: "4.5 out of 5 from 117 reviews"
			},
			{
				label: "Downloads",
				value: "10K+"
			},
			{
				label: "Category",
				value: "Business"
			},
			{
				label: "Content rating",
				value: "Rated for 3+"
			},
			{
				label: "Last updated",
				value: "Oct 14, 2026"
			},
			{
				label: "Languages",
				value: "English, German, French, Hindi"
			},
			{
				label: "Data safety",
				value: "No data shared with third parties. You can request that data be deleted."
			}
		]
	},
	ios: {
		id: "ios",
		label: "iPhone and iPad",
		storeName: "App Store",
		url: "https://apps.apple.com/in/app/threebestrated/id1445667019",
		rating: 4.3,
		ratingCount: 6,
		ratingNoun: "ratings",
		specs: [
			{
				label: "Rating",
				value: "4.3 out of 5 from 6 ratings"
			},
			{
				label: "Price",
				value: "Free"
			},
			{
				label: "Category",
				value: "Business"
			},
			{
				label: "Version",
				value: "12.0.2"
			},
			{
				label: "Size",
				value: "68.6 MB"
			},
			{
				label: "Requires",
				value: "iOS 15.0 or later, iPadOS 15.0 or later"
			},
			{
				label: "Age rating",
				value: "16+ (unrestricted web access)"
			},
			{
				label: "App privacy",
				value: "The developer reports that no data is collected."
			}
		]
	}
};
/** Weighted average across both stores, used for the schema.org aggregateRating. */
var COMBINED_RATING = (() => {
	const all = Object.values(STORES);
	const count = all.reduce((n, s) => n + s.ratingCount, 0);
	const value = all.reduce((n, s) => n + s.rating * s.ratingCount, 0) / count;
	return {
		value: Math.round(value * 10) / 10,
		count
	};
})();
var SHOT = {
	width: 1125,
	height: 2e3,
	sizes: [
		360,
		540,
		810,
		1125
	]
};
var SCREENSHOT_SETS = {
	phone: [
		{
			n: 1,
			caption: "200+ local categories. One trusted app.",
			alt: "ThreeBestRated on a phone: the Our Categories grid with Doctors, Entertainment, Health, Lawyers, Local Businesses, Local Services, Professional Services, Restaurants and Specialty Cuisine"
		},
		{
			n: 2,
			caption: "Only the best 3 local businesses make the list.",
			alt: "ThreeBestRated on a phone: the 3 best local plumbers in New York City, each with a rating, years in business and Call and Direction buttons"
		},
		{
			n: 3,
			caption: "Ask our AI assistant. Get instant answers.",
			alt: "ThreeBestRated on a phone: the TBR Assistant chat answering \"my car does not start\" with a View Top 3 button for car repair shops in New York City"
		},
		{
			n: 4,
			caption: "Voice search for nearby services.",
			alt: "ThreeBestRated on a phone: voice search listening for a category name while the user says \"I need amusement parks\""
		},
		{
			n: 5,
			caption: "All the details you need in one place.",
			alt: "ThreeBestRated on a phone: a business page for Roto-Rooter Plumbing and Water Cleanup with a 4.9 score, license numbers, an about section and Call and Direction buttons"
		},
		{
			n: 6,
			caption: "Handpicked by a 50-point inspection.",
			alt: "ThreeBestRated on a phone: the United States home screen with an Explore Categories button and a Recently Viewed list"
		}
	],
	tablet: [
		{
			n: 1,
			caption: "200+ local categories. One trusted app.",
			alt: "ThreeBestRated on a tablet: the Our Categories grid with Doctors, Entertainment, Health, Lawyers, Local Businesses, Local Services, Professional Services, Restaurants and Specialty Cuisine"
		},
		{
			n: 2,
			caption: "Only the best 3 local businesses make the list.",
			alt: "ThreeBestRated on a tablet: the 3 best local plumbers in New York City, each with a rating, years in business and Call and Direction buttons"
		},
		{
			n: 3,
			caption: "Ask our AI assistant. Get instant answers.",
			alt: "ThreeBestRated on a tablet: the TBR Assistant chat with quick suggestions and a View Top 3 button for car repair shops in New York City"
		},
		{
			n: 4,
			caption: "Voice search for nearby services.",
			alt: "ThreeBestRated on a tablet: voice search listening for a category name while the user says \"I have severe fever\""
		},
		{
			n: 5,
			caption: "All the details you need in one place.",
			alt: "ThreeBestRated on a tablet: a business page for A Good Plumber Inc. with a 4.8 score, license numbers, an about section and Call and Direction buttons"
		},
		{
			n: 6,
			caption: "Handpicked by a 50-point inspection.",
			alt: "ThreeBestRated on a tablet: the United States home screen with an Explore Categories button and the AI assistant prompt"
		}
	]
};
var DEVICES = {
	iphone: {
		id: "iphone",
		label: "iPhone",
		kind: "phone",
		set: "phone",
		store: "ios",
		note: "Free on the App Store. Needs iOS 15.0 or later."
	},
	"android-phone": {
		id: "android-phone",
		label: "Android phone",
		kind: "phone",
		set: "phone",
		store: "android",
		note: `Free on Google Play. Rated ${STORES.android.rating} from ${STORES.android.ratingCount} reviews.`
	},
	ipad: {
		id: "ipad",
		label: "iPad",
		kind: "tablet",
		set: "tablet",
		store: "ios",
		note: "The same App Store app runs on iPad. Needs iPadOS 15.0 or later."
	},
	"android-tablet": {
		id: "android-tablet",
		label: "Android tablet",
		kind: "tablet",
		set: "tablet",
		store: "android",
		note: "The Google Play listing includes tablet screenshots, so the layout fits larger screens."
	}
};
var DEVICE_ORDER = [
	"iphone",
	"android-phone",
	"ipad",
	"android-tablet"
];
/** `sizes` for the hero podium. Shared with the <link rel="preload"> so the browser downloads the file once. */
var PODIUM_SIZES = "(min-width: 961px) 220px, 38vw";
var shotUrl = (set, n, width = SHOT.sizes[SHOT.sizes.length - 1]) => `/screenshots/${set}/${n}-${width}.webp`;
var shotSrcSet = (set, n) => SHOT.sizes.map((w) => `${shotUrl(set, n, w)} ${w}w`).join(", ");
/** Absolute URLs of every full-size screenshot, for the schema.org markup and the image sitemap. */
var ALL_SCREENSHOTS = Object.keys(SCREENSHOT_SETS).flatMap((set) => SCREENSHOT_SETS[set].map((s) => ({
	...s,
	set,
	url: `${SITE_URL}${shotUrl(set, s.n)}`
})));
//#endregion
//#region src/data/content.ts
var NAV = [
	{
		href: "#how-it-works",
		label: "How it works"
	},
	{
		href: "#features",
		label: "Features"
	},
	{
		href: "#screenshots",
		label: "Screenshots"
	},
	{
		href: "#platforms",
		label: "Android and iOS"
	},
	{
		href: "#faq",
		label: "FAQ"
	}
];
var STEPS = [
	{
		title: "Pick what you need",
		body: "Choose from more than 200 categories, from doctors and lawyers to restaurants and home services. Search by voice if your hands are full."
	},
	{
		title: "Confirm your city",
		body: "The app detects your city and state with GPS, or you can type one of 200+ cities across eight countries."
	},
	{
		title: "Choose from three",
		body: "You get the top three verified businesses, with real customer reviews, so the decision takes minutes instead of an evening."
	}
];
var FEATURES = [
	{
		title: "Three results, never thirty",
		body: "No endless scrolling and no questionable listings. Each search ends with the top three providers in your area."
	},
	{
		title: "A 50-point inspection",
		body: "Every business is evaluated on reputation, reviews, service quality and business standards before it earns a place."
	},
	{
		title: "Handpicked by trained analysts",
		body: "People, not an algorithm alone, select each business. Listings are reviewed regularly so the information stays accurate."
	},
	{
		title: "Honest customer reviews",
		body: "Read positive and negative feedback side by side, so you can choose with your eyes open."
	},
	{
		title: "500,000+ verified businesses",
		body: "One app covers the major cities in the United States, Canada, the United Kingdom, Australia, India, Singapore, Germany and France."
	},
	{
		title: "Free and ad-free",
		body: "The app is free to use, with no hidden promotions. The inspection result decides who is listed."
	},
	{
		title: "In your language",
		body: "Use the app in English, German, French or Hindi."
	},
	{
		title: "Transparent and private",
		body: "ThreeBestRated operates with full transparency, strong data protection and strict compliance with advertising laws."
	}
];
var WHATS_NEW = [
	"GPS-based city and state detection",
	"Voice search",
	"Quick actions for Home, Categories and Recently viewed",
	"Recently viewed and recommended businesses",
	"Mapbox maps with multiple map styles",
	"Push notifications and deep links to Top Three and single-business screens",
	"In-app reviews",
	"Faster, cleaner interface"
];
var REVIEWS = [
	{
		quote: "Excellent user friendly app. Accurate, non judgemental and essential data for all types of business are available.",
		name: "S A Arabjan",
		store: "Google Play",
		date: "January 2026"
	},
	{
		quote: "Super Helpful for Finding Top Local Services! Accurate and Honest Recommendations.",
		name: "Santhos Chandrasekaran",
		store: "App Store",
		date: "June 2025"
	},
	{
		quote: "It's really helpful to find the best companies, restaurants, doctors and more.",
		name: "Raihana Abdulla",
		store: "Google Play",
		date: "January 2022"
	}
];
var FAQS = [
	{
		id: "free",
		q: "Is the ThreeBestRated app free?",
		a: "Yes. The app is free to download and free to use on both Android and iPhone. It does not carry hidden promotions."
	},
	{
		id: "what",
		q: "What does the ThreeBestRated app do?",
		a: `It shows you the top three local businesses and professionals in your city, such as doctors, lawyers and restaurants, instead of a long list of results. It has been selecting top-three businesses since ${APP.since}.`
	},
	{
		id: "choose",
		q: "How does ThreeBestRated choose the top three?",
		a: `Trained analysts apply a 50-point inspection that includes ${APP.inspectionAreas.slice(0, -1).join(", ").toLowerCase()} and ${APP.inspectionAreas[APP.inspectionAreas.length - 1].toLowerCase()}. Only businesses that are verified by the team are shown.`
	},
	{
		id: "where",
		q: "Which countries and cities does the app cover?",
		a: `The app covers more than 200 cities in ${APP.countries.length} countries: ${APP.countries.slice(0, -1).join(", ")} and ${APP.countries[APP.countries.length - 1]}. More than 500,000 verified businesses are listed.`
	},
	{
		id: "languages",
		q: "Which languages are supported?",
		a: "The Google Play listing says the app is available in English, German, French and Hindi. The App Store listing currently shows English."
	},
	{
		id: "download",
		q: "How do I download the app on Android or iPhone?",
		a: "On Android, open ThreeBestRated on Google Play and tap Install. On iPhone or iPad, open ThreeBestRated on the App Store and tap Get. The iPhone app needs iOS 15.0 or later."
	},
	{
		id: "privacy",
		q: "What data does the app collect?",
		a: "On Google Play, the developer states that no data is shared with third parties, that the app may collect app info and performance data, and that you can request deletion of your data. On the App Store, the developer states that no data is collected. Read the full privacy policy on the ThreeBestRated website for details."
	},
	{
		id: "pay",
		q: "Can a business pay to be in the top three?",
		a: "ThreeBestRated states that every listed business is handpicked by trained analysts after inspection, and that the service operates with full transparency and in compliance with advertising laws."
	}
];
//#endregion
//#region src/store/slices/analytics.ts
var createAnalyticsSlice = (set) => ({
	lastDownload: null,
	trackDownload: (store, placement) => {
		set({ lastDownload: {
			store,
			placement
		} });
		if (typeof window !== "undefined") window.dataLayer?.push({
			event: "download_click",
			store,
			placement
		});
	}
});
//#endregion
//#region src/store/slices/compare.ts
var createCompareSlice = (set) => ({
	activeStore: "android",
	setActiveStore: (activeStore) => set({ activeStore })
});
//#endregion
//#region src/store/slices/faq.ts
var createFaqSlice = (set) => ({
	openFaqId: "free",
	toggleFaq: (id) => set((s) => ({ openFaqId: s.openFaqId === id ? null : id }))
});
//#endregion
//#region src/store/slices/gallery.ts
var createGallerySlice = (set) => ({
	activeDevice: "iphone",
	setDevice: (activeDevice) => set((s) => s.activeDevice === activeDevice ? s : {
		activeDevice,
		lightboxIndex: null
	}),
	lightboxIndex: null,
	openLightbox: (lightboxIndex) => set({ lightboxIndex }),
	closeLightbox: () => set({ lightboxIndex: null }),
	stepLightbox: (delta, total) => set((s) => s.lightboxIndex === null ? s : { lightboxIndex: (s.lightboxIndex + delta + total) % total })
});
//#endregion
//#region src/store/slices/platform.ts
var createPlatformSlice = (set) => ({
	platform: null,
	setPlatform: (platform, device) => set((s) => ({
		platform,
		activeStore: platform === "desktop" ? s.activeStore : platform,
		activeDevice: device ?? s.activeDevice
	}))
});
//#endregion
//#region src/store/slices/ui.ts
var createUiSlice = (set) => ({
	menuOpen: false,
	showStickyCta: false,
	toggleMenu: () => set((s) => ({ menuOpen: !s.menuOpen })),
	closeMenu: () => set({ menuOpen: false }),
	setShowStickyCta: (showStickyCta) => set((s) => s.showStickyCta === showStickyCta ? s : { showStickyCta })
});
//#endregion
//#region src/store/index.ts
var useAppStore = create()((...a) => ({
	...createPlatformSlice(...a),
	...createCompareSlice(...a),
	...createGallerySlice(...a),
	...createFaqSlice(...a),
	...createUiSlice(...a),
	...createAnalyticsSlice(...a)
}));
//#endregion
//#region src/components/Icons.tsx
var base = {
	viewBox: "0 0 24 24",
	"aria-hidden": true,
	focusable: false
};
var AppleIcon = (p) => /* @__PURE__ */ jsx("svg", {
	...base,
	...p,
	fill: "currentColor",
	children: /* @__PURE__ */ jsx("path", { d: "M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" })
});
var PlayIcon = (p) => /* @__PURE__ */ jsxs("svg", {
	...base,
	...p,
	children: [
		/* @__PURE__ */ jsx("path", {
			fill: "#00A0FF",
			d: "M3.6 1.5 13.4 12 3.6 22.5c-.4-.3-.6-.8-.6-1.4V2.9c0-.6.2-1.1.6-1.4z"
		}),
		/* @__PURE__ */ jsx("path", {
			fill: "#00E26A",
			d: "M13.4 12 3.6 1.5c.5-.2 1.2-.1 1.7.2l11.4 6.8z"
		}),
		/* @__PURE__ */ jsx("path", {
			fill: "#FF3A44",
			d: "m13.4 12 3.3 3.5-11.4 6.6c-.5.3-1.2.4-1.7.2z"
		}),
		/* @__PURE__ */ jsx("path", {
			fill: "#FFC800",
			d: "m16.7 8.5 4.3 2.5c.8.5.8 1.5 0 2l-4.3 2.5L13.4 12z"
		})
	]
});
var StarIcon = (p) => /* @__PURE__ */ jsx("svg", {
	...base,
	...p,
	fill: "currentColor",
	children: /* @__PURE__ */ jsx("path", { d: "m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" })
});
var CheckIcon = (p) => /* @__PURE__ */ jsx("svg", {
	...base,
	...p,
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2.4",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	children: /* @__PURE__ */ jsx("path", { d: "m5 12.5 4.5 4.5L19 7.5" })
});
var CloseIcon = (p) => /* @__PURE__ */ jsx("svg", {
	...base,
	...p,
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	children: /* @__PURE__ */ jsx("path", { d: "M6 6l12 12M18 6 6 18" })
});
var ChevronIcon = (p) => /* @__PURE__ */ jsx("svg", {
	...base,
	...p,
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	children: /* @__PURE__ */ jsx("path", { d: "m6 9 6 6 6-6" })
});
var MenuIcon = (p) => /* @__PURE__ */ jsx("svg", {
	...base,
	...p,
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	children: /* @__PURE__ */ jsx("path", { d: "M4 7h16M4 12h16M4 17h16" })
});
var PhoneIcon = (p) => /* @__PURE__ */ jsxs("svg", {
	...base,
	...p,
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.8",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	children: [/* @__PURE__ */ jsx("rect", {
		x: "7",
		y: "2.5",
		width: "10",
		height: "19",
		rx: "2.6"
	}), /* @__PURE__ */ jsx("path", { d: "M10.6 5.2h2.8" })]
});
var TabletIcon = (p) => /* @__PURE__ */ jsxs("svg", {
	...base,
	...p,
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.8",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	children: [/* @__PURE__ */ jsx("rect", {
		x: "4.5",
		y: "2.5",
		width: "15",
		height: "19",
		rx: "2.4"
	}), /* @__PURE__ */ jsx("path", { d: "M10.5 18.6h3" })]
});
function StarRow({ value }) {
	return /* @__PURE__ */ jsx("span", {
		className: "stars",
		role: "img",
		"aria-label": `${value} out of 5 stars`,
		children: [
			1,
			2,
			3,
			4,
			5
		].map((n) => /* @__PURE__ */ jsx(StarIcon, { className: n <= Math.round(value) ? "on" : "off" }, n))
	});
}
//#endregion
//#region src/components/Faq.tsx
function Faq() {
	const openId = useAppStore((s) => s.openFaqId);
	const toggle = useAppStore((s) => s.toggleFaq);
	return /* @__PURE__ */ jsx("section", {
		id: "faq",
		className: "section",
		"aria-labelledby": "faq-title",
		children: /* @__PURE__ */ jsxs("div", {
			className: "wrap faq",
			children: [/* @__PURE__ */ jsx("h2", {
				id: "faq-title",
				children: "Questions about the ThreeBestRated app"
			}), /* @__PURE__ */ jsx("div", {
				className: "faq__list",
				children: FAQS.map((f) => {
					const open = openId === f.id;
					return /* @__PURE__ */ jsxs("div", {
						className: `faq__item${open ? " is-open" : ""}`,
						children: [/* @__PURE__ */ jsx("h3", { children: /* @__PURE__ */ jsxs("button", {
							type: "button",
							id: `faq-q-${f.id}`,
							"aria-expanded": open,
							"aria-controls": `faq-a-${f.id}`,
							onClick: () => toggle(f.id),
							children: [/* @__PURE__ */ jsx("span", { children: f.q }), /* @__PURE__ */ jsx(ChevronIcon, {})]
						}) }), /* @__PURE__ */ jsx("div", {
							className: "faq__a",
							id: `faq-a-${f.id}`,
							role: "region",
							"aria-labelledby": `faq-q-${f.id}`,
							children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { children: f.a }) })
						})]
					}, f.id);
				})
			})]
		})
	});
}
//#endregion
//#region src/components/Features.tsx
function Features() {
	return /* @__PURE__ */ jsx("section", {
		id: "features",
		className: "section section--tint",
		"aria-labelledby": "features-title",
		children: /* @__PURE__ */ jsxs("div", {
			className: "wrap",
			children: [/* @__PURE__ */ jsx("h2", {
				id: "features-title",
				children: "Why people choose the ThreeBestRated app"
			}), /* @__PURE__ */ jsx("ul", {
				className: "feature-list",
				children: FEATURES.map((f) => /* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("h3", { children: f.title }), /* @__PURE__ */ jsx("p", { children: f.body })] }, f.title))
			})]
		})
	});
}
//#endregion
//#region src/components/StoreButton.tsx
function StoreButton({ store, placement, featured = false, tone = "light" }) {
	const trackDownload = useAppStore((s) => s.trackDownload);
	const listing = STORES[store];
	const isIos = store === "ios";
	return /* @__PURE__ */ jsxs("a", {
		className: `store-btn store-btn--${tone}${featured ? " is-featured" : ""}`,
		href: listing.url,
		target: "_blank",
		rel: "noopener",
		onClick: () => trackDownload(store, placement),
		"aria-label": `${isIos ? "Download ThreeBestRated on the App Store" : "Get ThreeBestRated on Google Play"}`,
		children: [isIos ? /* @__PURE__ */ jsx(AppleIcon, { className: "store-btn__icon" }) : /* @__PURE__ */ jsx(PlayIcon, { className: "store-btn__icon" }), /* @__PURE__ */ jsxs("span", {
			className: "store-btn__text",
			children: [/* @__PURE__ */ jsx("small", { children: isIos ? "Download on the" : "Get it on" }), /* @__PURE__ */ jsx("strong", { children: listing.storeName })]
		})]
	});
}
function StoreButtons({ placement, tone = "light" }) {
	const platform = useAppStore((s) => s.platform);
	return /* @__PURE__ */ jsx("div", {
		className: "store-row",
		children: (platform === "ios" ? ["ios", "android"] : ["android", "ios"]).map((id) => /* @__PURE__ */ jsx(StoreButton, {
			store: id,
			placement,
			tone,
			featured: platform === id
		}, id))
	});
}
//#endregion
//#region src/components/FinalCta.tsx
function FinalCta() {
	return /* @__PURE__ */ jsx("section", {
		id: "download",
		className: "cta",
		"aria-labelledby": "cta-title",
		children: /* @__PURE__ */ jsxs("div", {
			className: "wrap cta__grid",
			children: [/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("h2", {
					id: "cta-title",
					children: "Stop searching. Start choosing the best."
				}),
				/* @__PURE__ */ jsx("p", {
					className: "lede",
					children: "Download ThreeBestRated free and see the top three near you in under a minute."
				}),
				/* @__PURE__ */ jsx(StoreButtons, {
					placement: "final-cta",
					tone: "light"
				})
			] }), /* @__PURE__ */ jsxs("div", {
				className: "qr",
				"aria-label": "Scan to download",
				children: [/* @__PURE__ */ jsxs("figure", { children: [/* @__PURE__ */ jsx("img", {
					src: "/qr-android.svg",
					alt: `QR code for ${STORES.android.storeName}`,
					width: 132,
					height: 132
				}), /* @__PURE__ */ jsx("figcaption", { children: "Android" })] }), /* @__PURE__ */ jsxs("figure", { children: [/* @__PURE__ */ jsx("img", {
					src: "/qr-ios.svg",
					alt: `QR code for the ${STORES.ios.storeName}`,
					width: 132,
					height: 132
				}), /* @__PURE__ */ jsx("figcaption", { children: "IOS" })] })]
			})]
		})
	});
}
//#endregion
//#region src/components/Logo.tsx
function LogoMark({ size = 180 }) {
	return /* @__PURE__ */ jsx("img", {
		src: "/threebestratedFooter.png",
		alt: "",
		width: size,
		height: size,
		"aria-hidden": "true",
		style: {
			display: "block",
			objectFit: "contain"
		}
	});
}
function Logo() {
	return /* @__PURE__ */ jsx("a", {
		className: "logo",
		href: "/",
		"aria-label": "ThreeBestRated home",
		children: /* @__PURE__ */ jsx(LogoMark, {})
	});
}
//#endregion
//#region src/components/Footer.tsx
function Footer() {
	return /* @__PURE__ */ jsxs("footer", {
		className: "footer",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "wrap footer__grid",
			children: [
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Logo, {}), /* @__PURE__ */ jsxs("p", {
					className: "footer__blurb",
					children: [
						"Three selected local businesses and professionals near you across ",
						APP.stats.countries,
						" countries."
					]
				})] }),
				/* @__PURE__ */ jsx("nav", {
					"aria-label": "Footer",
					children: /* @__PURE__ */ jsxs("ul", { children: [
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
							href: APP.website,
							children: "ThreeBestRated website"
						}) }),
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
							href: APP.privacyUrl,
							children: "Privacy policy"
						}) }),
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
							href: `mailto:${APP.supportEmail}`,
							children: APP.supportEmail
						}) }),
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
							href: `tel:${APP.phone.replace(/[^+\d]/g, "")}`,
							children: APP.phone
						}) })
					] })
				}),
				/* @__PURE__ */ jsxs("address", { children: [
					APP.developer,
					/* @__PURE__ */ jsx("br", {}),
					APP.address
				] })
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "wrap footer__legal",
			children: /* @__PURE__ */ jsxs("p", { children: [
				"© ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" Three Best Rated®. Google Play and the Google Play logo are trademarks of Google LLC. Apple and the Apple logo are trademarks of Apple Inc., registered in the U.S. and other countries."
			] })
		})]
	});
}
//#endregion
//#region src/store/selectors.ts
/** The store to feature first: iPhone visitors see the App Store, everyone else sees Google Play. */
var selectPrimaryStore = (s) => s.platform === "ios" ? "ios" : "android";
var selectIsMobile = (s) => s.platform === "ios" || s.platform === "android";
//#endregion
//#region src/components/Header.tsx
function Header() {
	const menuOpen = useAppStore((s) => s.menuOpen);
	const toggleMenu = useAppStore((s) => s.toggleMenu);
	const closeMenu = useAppStore((s) => s.closeMenu);
	const primary = useAppStore(selectPrimaryStore);
	const trackDownload = useAppStore((s) => s.trackDownload);
	return /* @__PURE__ */ jsx("header", {
		className: "site-header",
		children: /* @__PURE__ */ jsxs("div", {
			className: "wrap site-header__inner",
			children: [
				/* @__PURE__ */ jsx(Logo, {}),
				/* @__PURE__ */ jsx("nav", {
					id: "site-nav",
					className: `site-nav${menuOpen ? " is-open" : ""}`,
					"aria-label": "Primary",
					children: /* @__PURE__ */ jsx("ul", { children: NAV.map((n) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
						href: n.href,
						onClick: closeMenu,
						children: n.label
					}) }, n.href)) })
				}),
				/* @__PURE__ */ jsx("a", {
					className: "btn btn--gold site-header__cta",
					href: STORES[primary].url,
					target: "_blank",
					rel: "noopener",
					onClick: () => trackDownload(primary, "header"),
					children: "Download the app"
				}),
				/* @__PURE__ */ jsx("button", {
					className: "icon-btn site-header__menu",
					type: "button",
					"aria-expanded": menuOpen,
					"aria-controls": "site-nav",
					"aria-label": menuOpen ? "Close menu" : "Open menu",
					onClick: toggleMenu,
					children: menuOpen ? /* @__PURE__ */ jsx(CloseIcon, {}) : /* @__PURE__ */ jsx(MenuIcon, {})
				})
			]
		})
	});
}
//#endregion
//#region src/components/ScreenImage.tsx
/** One responsive screenshot. Width and height are the real file size so the layout never shifts. */
function ScreenImage({ set, shot, sizes, priority = false, eager = false }) {
	return /* @__PURE__ */ jsx("img", {
		src: shotUrl(set, shot.n, 540),
		srcSet: shotSrcSet(set, shot.n),
		sizes,
		width: SHOT.width,
		height: SHOT.height,
		alt: shot.alt,
		decoding: "async",
		loading: priority || eager ? "eager" : "lazy",
		fetchPriority: priority ? "high" : void 0
	});
}
//#endregion
//#region src/components/Podium.tsx
var phone = SCREENSHOT_SETS.phone;
var byN = (n) => phone.find((s) => s.n === n);
/**
* Three real app screens on a podium, laid out like the logo: silver on the left, gold in the middle, bronze on
* the right. On load they rise in the order 3, 2, 1. This is the one animated moment in the hero.
*/
var PLACES = [
	{
		rank: 2,
		shot: byN(3),
		tone: "silver"
	},
	{
		rank: 1,
		shot: byN(2),
		tone: "gold"
	},
	{
		rank: 3,
		shot: byN(1),
		tone: "bronze"
	}
];
function Podium() {
	return /* @__PURE__ */ jsx("div", {
		className: "stage",
		children: /* @__PURE__ */ jsx("ul", {
			className: "podium",
			"aria-label": "Three screens from the ThreeBestRated app",
			children: PLACES.map((p) => /* @__PURE__ */ jsxs("li", {
				className: `podium__item podium__item--${p.rank}`,
				children: [/* @__PURE__ */ jsx("div", {
					className: "podium__shot",
					children: /* @__PURE__ */ jsx(ScreenImage, {
						set: "phone",
						shot: p.shot,
						sizes: PODIUM_SIZES,
						priority: p.rank === 1,
						eager: true
					})
				}), /* @__PURE__ */ jsx("span", {
					className: `podium__step podium__step--${p.tone}`,
					"aria-hidden": "true",
					children: p.rank
				})]
			}, p.rank))
		})
	});
}
//#endregion
//#region src/components/Hero.tsx
function Hero() {
	return /* @__PURE__ */ jsxs("section", {
		className: "hero",
		"aria-labelledby": "hero-title",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "wrap hero__grid",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "hero__copy",
				children: [
					/* @__PURE__ */ jsx("h1", {
						id: "hero-title",
						children: "ThreeBestRated app: only the top three local businesses near you"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "lede",
						children: "Open the app, pick a category and see three verified choices. Every business passes a 50-point inspection of reputation, reviews and service quality, so you can stop comparing and start booking. Free on iPhone, iPad, and Android phones and tablets."
					}),
					/* @__PURE__ */ jsx(StoreButtons, {
						placement: "hero",
						tone: "light"
					}),
					/* @__PURE__ */ jsx("ul", {
						className: "ratings",
						"aria-label": "Store ratings",
						children: ["android", "ios"].map((id) => /* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx(StarRow, { value: STORES[id].rating }), /* @__PURE__ */ jsxs("span", { children: [
							/* @__PURE__ */ jsx("strong", { children: STORES[id].rating.toFixed(1) }),
							" on ",
							STORES[id].storeName,
							/* @__PURE__ */ jsxs("span", {
								className: "muted-on-dark",
								children: [
									" ",
									"from ",
									STORES[id].ratingCount,
									" ",
									STORES[id].ratingNoun
								]
							})
						] })] }, id))
					})
				]
			}), /* @__PURE__ */ jsx(Podium, {})]
		}), /* @__PURE__ */ jsx("div", {
			className: "wrap",
			children: /* @__PURE__ */ jsxs("dl", {
				className: "facts",
				children: [
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", { children: APP.stats.monthlyUsers }), /* @__PURE__ */ jsx("dd", { children: "people use it every month" })] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", { children: APP.stats.businesses }), /* @__PURE__ */ jsx("dd", { children: "verified businesses" })] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", { children: APP.stats.cities }), /* @__PURE__ */ jsx("dd", { children: "cities" })] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", { children: APP.stats.countries }), /* @__PURE__ */ jsxs("dd", { children: ["countries, since ", APP.since] })] })
				]
			})
		})]
	});
}
//#endregion
//#region src/components/HowItWorks.tsx
function HowItWorks() {
	return /* @__PURE__ */ jsx("section", {
		id: "how-it-works",
		className: "section",
		"aria-labelledby": "how-title",
		children: /* @__PURE__ */ jsxs("div", {
			className: "wrap how",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "how__intro",
				children: [
					/* @__PURE__ */ jsx("h2", {
						id: "how-title",
						children: "Find a local expert in three steps"
					}),
					/* @__PURE__ */ jsxs("p", { children: [
						"Searching for “best services near me” returns thousands of results. ThreeBestRated returns three, and each one has been checked against ten areas of the inspection, including",
						" ",
						APP.inspectionAreas.slice(0, 5).join(", ").toLowerCase(),
						" and more."
					] }),
					/* @__PURE__ */ jsx("ul", {
						className: "tags",
						"aria-label": "Areas covered by the 50-point inspection",
						children: APP.inspectionAreas.map((a) => /* @__PURE__ */ jsx("li", { children: a }, a))
					})
				]
			}), /* @__PURE__ */ jsx("ol", {
				className: "steps",
				children: STEPS.map((s, i) => /* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("span", {
					className: "steps__n",
					"aria-hidden": "true",
					children: i + 1
				}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", { children: s.title }), /* @__PURE__ */ jsx("p", { children: s.body })] })] }, s.title))
			})]
		})
	});
}
//#endregion
//#region src/components/Lightbox.tsx
function Lightbox() {
	const index = useAppStore((s) => s.lightboxIndex);
	const device = useAppStore((s) => s.activeDevice);
	const close = useAppStore((s) => s.closeLightbox);
	const step = useAppStore((s) => s.stepLightbox);
	const dialog = useRef(null);
	const closeBtn = useRef(null);
	const touchX = useRef(null);
	const set = DEVICES[device].set;
	const shots = SCREENSHOT_SETS[set];
	const total = shots.length;
	const isOpen = index !== null;
	useEffect(() => {
		if (!isOpen) return;
		const previous = document.activeElement;
		closeBtn.current?.focus();
		document.body.style.overflow = "hidden";
		const onKey = (e) => {
			if (e.key === "Escape") close();
			else if (e.key === "ArrowRight") step(1, total);
			else if (e.key === "ArrowLeft") step(-1, total);
			else if (e.key === "Tab" && dialog.current) {
				const items = Array.from(dialog.current.querySelectorAll("button"));
				const first = items[0];
				const last = items[items.length - 1];
				if (e.shiftKey && document.activeElement === first) {
					e.preventDefault();
					last.focus();
				} else if (!e.shiftKey && document.activeElement === last) {
					e.preventDefault();
					first.focus();
				}
			}
		};
		window.addEventListener("keydown", onKey);
		return () => {
			window.removeEventListener("keydown", onKey);
			document.body.style.overflow = "";
			previous?.focus();
		};
	}, [
		isOpen,
		close,
		step,
		total
	]);
	useEffect(() => {
		if (index === null) return;
		for (const n of [index + 1, index - 1]) {
			const shot = shots[(n + total) % total];
			new Image().src = shotUrl(set, shot.n, 810);
		}
	}, [
		index,
		set,
		shots,
		total
	]);
	if (index === null) return null;
	const shot = shots[index];
	const onTouchStart = (e) => {
		touchX.current = e.touches[0].clientX;
	};
	const onTouchEnd = (e) => {
		if (touchX.current === null) return;
		const dx = e.changedTouches[0].clientX - touchX.current;
		touchX.current = null;
		if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1, total);
	};
	return /* @__PURE__ */ jsxs("div", {
		ref: dialog,
		className: "lightbox",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": `${DEVICES[device].label} screenshot viewer`,
		onClick: close,
		onTouchStart,
		onTouchEnd,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "lightbox__body",
				onClick: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ jsx("img", {
					src: shotUrl(set, shot.n, 810),
					srcSet: shotSrcSet(set, shot.n),
					sizes: "(min-aspect-ratio: 9/16) 48vh, 92vw",
					width: 1125,
					height: 2e3,
					alt: shot.alt
				}, `${set}-${shot.n}`), /* @__PURE__ */ jsxs("p", {
					className: "lightbox__count",
					"aria-live": "polite",
					children: [
						index + 1,
						" of ",
						total
					]
				})]
			}),
			/* @__PURE__ */ jsx("button", {
				ref: closeBtn,
				className: "icon-btn lightbox__close",
				type: "button",
				onClick: close,
				"aria-label": "Close",
				children: /* @__PURE__ */ jsx(CloseIcon, {})
			}),
			/* @__PURE__ */ jsx("button", {
				className: "icon-btn lightbox__nav lightbox__nav--prev",
				type: "button",
				"aria-label": "Previous screenshot",
				onClick: (e) => {
					e.stopPropagation();
					step(-1, total);
				},
				children: /* @__PURE__ */ jsx(ChevronIcon, {})
			}),
			/* @__PURE__ */ jsx("button", {
				className: "icon-btn lightbox__nav lightbox__nav--next",
				type: "button",
				"aria-label": "Next screenshot",
				onClick: (e) => {
					e.stopPropagation();
					step(1, total);
				},
				children: /* @__PURE__ */ jsx(ChevronIcon, {})
			})
		]
	});
}
//#endregion
//#region src/components/Platforms.tsx
var ORDER = ["android", "ios"];
function Platforms() {
	const active = useAppStore((s) => s.activeStore);
	const setActive = useAppStore((s) => s.setActiveStore);
	const platform = useAppStore((s) => s.platform);
	return /* @__PURE__ */ jsx("section", {
		id: "platforms",
		className: "section section--tint",
		"aria-labelledby": "platforms-title",
		children: /* @__PURE__ */ jsxs("div", {
			className: "wrap",
			children: [
				/* @__PURE__ */ jsx("h2", {
					id: "platforms-title",
					children: "ThreeBestRated for Android and iPhone"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "section-lede",
					children: "The same top-three results on both platforms. Here is what each store listing says."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "tabs",
					role: "tablist",
					"aria-label": "Choose a platform",
					children: ORDER.map((id) => /* @__PURE__ */ jsx("button", {
						role: "tab",
						type: "button",
						id: `tab-${id}`,
						"aria-selected": active === id,
						"aria-controls": `panel-${id}`,
						tabIndex: active === id ? 0 : -1,
						className: active === id ? "is-active" : "",
						onClick: () => setActive(id),
						onKeyDown: (e) => {
							if (e.key === "ArrowRight" || e.key === "ArrowLeft") setActive(id === "android" ? "ios" : "android");
						},
						children: STORES[id].label
					}, id))
				}),
				ORDER.map((id) => {
					const s = STORES[id];
					return /* @__PURE__ */ jsxs("div", {
						role: "tabpanel",
						id: `panel-${id}`,
						"aria-labelledby": `tab-${id}`,
						className: "panel",
						hidden: active !== id,
						children: [/* @__PURE__ */ jsxs("div", {
							className: "panel__head",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", { children: s.storeName }), /* @__PURE__ */ jsxs("p", {
								className: "panel__rating",
								children: [
									/* @__PURE__ */ jsx(StarRow, { value: s.rating }),
									" ",
									/* @__PURE__ */ jsx("strong", { children: s.rating.toFixed(1) }),
									" from ",
									s.ratingCount,
									" ",
									s.ratingNoun
								]
							})] }), /* @__PURE__ */ jsx(StoreButton, {
								store: id,
								placement: "platforms",
								tone: "dark",
								featured: platform === id
							})]
						}), /* @__PURE__ */ jsx("dl", {
							className: "specs",
							children: s.specs.map((row) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", { children: row.label }), /* @__PURE__ */ jsx("dd", { children: row.value })] }, row.label))
						})]
					}, id);
				})
			]
		})
	});
}
//#endregion
//#region src/components/Reviews.tsx
function Reviews() {
	const [lead, ...rest] = REVIEWS;
	return /* @__PURE__ */ jsx("section", {
		id: "reviews",
		className: "section section--tint",
		"aria-labelledby": "reviews-title",
		children: /* @__PURE__ */ jsxs("div", {
			className: "wrap",
			children: [
				/* @__PURE__ */ jsx("h2", {
					id: "reviews-title",
					children: "What users say in the stores"
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "reviews__summary",
					children: [/* @__PURE__ */ jsx(StarRow, { value: COMBINED_RATING.value }), /* @__PURE__ */ jsxs("span", { children: [
						"Rated ",
						STORES.android.rating.toFixed(1),
						" on Google Play and ",
						STORES.ios.rating.toFixed(1),
						" on the App Store."
					] })]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "quotes",
					children: [/* @__PURE__ */ jsxs("figure", {
						className: "quote quote--lead",
						children: [/* @__PURE__ */ jsx("blockquote", { children: /* @__PURE__ */ jsx("p", { children: lead.quote }) }), /* @__PURE__ */ jsxs("figcaption", { children: [
							lead.name,
							", ",
							lead.store,
							", ",
							lead.date
						] })]
					}), rest.map((r) => /* @__PURE__ */ jsxs("figure", {
						className: "quote",
						children: [/* @__PURE__ */ jsx("blockquote", { children: /* @__PURE__ */ jsx("p", { children: r.quote }) }), /* @__PURE__ */ jsxs("figcaption", { children: [
							r.name,
							", ",
							r.store,
							", ",
							r.date
						] })]
					}, r.name))]
				})
			]
		})
	});
}
//#endregion
//#region src/components/Screenshots.tsx
var CARD_SIZES = "(min-width: 700px) 280px, 62vw";
function Screenshots() {
	const device = useAppStore((s) => s.activeDevice);
	const setDevice = useAppStore((s) => s.setDevice);
	const open = useAppStore((s) => s.openLightbox);
	const current = DEVICES[device];
	const shots = SCREENSHOT_SETS[current.set];
	const list = useRef(null);
	const thumb = useRef(null);
	const syncProgress = useCallback(() => {
		const el = list.current;
		if (!el || !thumb.current) return;
		const max = el.scrollWidth - el.clientWidth;
		thumb.current.style.setProperty("--p", String(max > 0 ? Math.min(1, Math.max(0, el.scrollLeft / max)) : 0));
	}, []);
	useEffect(() => {
		list.current?.scrollTo({ left: 0 });
		syncProgress();
	}, [current.set, syncProgress]);
	const page = (dir) => {
		const el = list.current;
		const card = el?.querySelector("li");
		if (!el || !card) return;
		const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		el.scrollBy({
			left: dir * (card.getBoundingClientRect().width + gap) * 2,
			behavior: reduce ? "auto" : "smooth"
		});
	};
	const onTabKey = (e, id) => {
		const i = DEVICE_ORDER.indexOf(id);
		let next = i;
		if (e.key === "ArrowRight") next = (i + 1) % DEVICE_ORDER.length;
		else if (e.key === "ArrowLeft") next = (i - 1 + DEVICE_ORDER.length) % DEVICE_ORDER.length;
		else if (e.key === "Home") next = 0;
		else if (e.key === "End") next = DEVICE_ORDER.length - 1;
		else return;
		e.preventDefault();
		setDevice(DEVICE_ORDER[next]);
		document.getElementById(`device-${DEVICE_ORDER[next]}`)?.focus();
	};
	return /* @__PURE__ */ jsxs("section", {
		id: "screenshots",
		className: "section section--dark",
		"aria-labelledby": "shots-title",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "wrap",
			children: [
				/* @__PURE__ */ jsx("h2", {
					id: "shots-title",
					children: "See the app on your iPhone, iPad or Android"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "section-lede",
					children: "Six screens from the store listings, shown the way they look on phones and tablets. Pick your device, then tap a screen to enlarge it."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "devices",
					role: "tablist",
					"aria-label": "Choose your device",
					children: DEVICE_ORDER.map((id) => {
						const d = DEVICES[id];
						const selected = id === device;
						return /* @__PURE__ */ jsxs("button", {
							role: "tab",
							type: "button",
							id: `device-${id}`,
							"aria-selected": selected,
							"aria-controls": "shots-panel",
							tabIndex: selected ? 0 : -1,
							className: selected ? "is-active" : "",
							onClick: () => setDevice(id),
							onKeyDown: (e) => onTabKey(e, id),
							children: [d.kind === "phone" ? /* @__PURE__ */ jsx(PhoneIcon, {}) : /* @__PURE__ */ jsx(TabletIcon, {}), d.label]
						}, id);
					})
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			id: "shots-panel",
			role: "tabpanel",
			"aria-labelledby": `device-${device}`,
			children: [/* @__PURE__ */ jsx("ul", {
				ref: list,
				className: `gallery gallery--${current.set}`,
				"aria-label": `${current.label} screenshots`,
				onScroll: syncProgress,
				children: shots.map((s, i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => open(i),
					"aria-label": `Enlarge screenshot ${i + 1} of ${shots.length}: ${s.caption}`,
					children: /* @__PURE__ */ jsx(ScreenImage, {
						set: current.set,
						shot: s,
						sizes: CARD_SIZES
					})
				}) }, s.n))
			}, current.set), /* @__PURE__ */ jsxs("div", {
				className: "wrap shots-foot",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "shots-foot__left",
					children: [/* @__PURE__ */ jsx("p", {
						className: "shots-foot__note",
						children: current.note
					}), /* @__PURE__ */ jsx("span", {
						className: "progress",
						"aria-hidden": "true",
						children: /* @__PURE__ */ jsx("span", { ref: thumb })
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "shots-foot__right",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "gallery-nav",
						children: [/* @__PURE__ */ jsx("button", {
							type: "button",
							className: "icon-btn",
							"aria-label": "Scroll screenshots back",
							onClick: () => page(-1),
							children: /* @__PURE__ */ jsx(ChevronIcon, { className: "rot-l" })
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							className: "icon-btn",
							"aria-label": "Scroll screenshots forward",
							onClick: () => page(1),
							children: /* @__PURE__ */ jsx(ChevronIcon, { className: "rot-r" })
						})]
					}), /* @__PURE__ */ jsx(StoreButton, {
						store: current.store,
						placement: `gallery-${current.id}`,
						tone: "light"
					})]
				})]
			})]
		})]
	});
}
//#endregion
//#region src/components/StickyCta.tsx
/** A bottom bar for phone visitors once they scroll past the hero. */
function StickyCta() {
	const show = useAppStore((s) => s.showStickyCta);
	const mobile = useAppStore(selectIsMobile);
	const primary = useAppStore(selectPrimaryStore);
	const track = useAppStore((s) => s.trackDownload);
	const visible = show && mobile;
	return /* @__PURE__ */ jsxs("div", {
		className: `sticky-cta${visible ? " is-visible" : ""}`,
		"aria-hidden": !visible,
		children: [/* @__PURE__ */ jsxs("p", { children: [/* @__PURE__ */ jsx("strong", { children: "ThreeBestRated" }), /* @__PURE__ */ jsx("span", { children: "Top three near you. Free." })] }), /* @__PURE__ */ jsx("a", {
			className: "btn btn--gold",
			href: STORES[primary].url,
			target: "_blank",
			rel: "noopener",
			tabIndex: visible ? 0 : -1,
			onClick: () => track(primary, "sticky"),
			children: primary === "ios" ? "Get on App Store" : "Install"
		})]
	});
}
//#endregion
//#region src/components/WhatsNew.tsx
function WhatsNew() {
	return /* @__PURE__ */ jsx("section", {
		className: "section",
		"aria-labelledby": "new-title",
		children: /* @__PURE__ */ jsxs("div", {
			className: "wrap new",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
				id: "new-title",
				children: "What’s new in the latest update"
			}), /* @__PURE__ */ jsx("p", {
				className: "section-lede",
				children: "Updated on Google Play on October 14, 2026."
			})] }), /* @__PURE__ */ jsx("ul", {
				className: "ticks",
				children: WHATS_NEW.map((item) => /* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx(CheckIcon, {}), /* @__PURE__ */ jsx("span", { children: item })] }, item))
			})]
		})
	});
}
//#endregion
//#region src/store/hooks.ts
function detectDevice() {
	const ua = navigator.userAgent;
	if (/android/i.test(ua)) return {
		platform: "android",
		device: /mobile/i.test(ua) ? "android-phone" : "android-tablet"
	};
	if (/iPad/i.test(ua) || /Macintosh/i.test(ua) && navigator.maxTouchPoints > 1) return {
		platform: "ios",
		device: "ipad"
	};
	if (/iPhone|iPod/i.test(ua)) return {
		platform: "ios",
		device: "iphone"
	};
	return { platform: "desktop" };
}
function usePlatformDetection() {
	const setPlatform = useAppStore((s) => s.setPlatform);
	useEffect(() => {
		const { platform, device } = detectDevice();
		setPlatform(platform, device);
	}, [setPlatform]);
}
function useStickyCtaTrigger(offset = 640) {
	const setShow = useAppStore((s) => s.setShowStickyCta);
	useEffect(() => {
		const onScroll = () => setShow(window.scrollY > offset);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, [offset, setShow]);
}
//#endregion
//#region src/App.tsx
function App() {
	usePlatformDetection();
	useStickyCtaTrigger();
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("a", {
			className: "skip-link",
			href: "#main",
			children: "Skip to content"
		}),
		/* @__PURE__ */ jsx(Header, {}),
		/* @__PURE__ */ jsxs("main", {
			id: "main",
			children: [
				/* @__PURE__ */ jsx(Hero, {}),
				/* @__PURE__ */ jsx(HowItWorks, {}),
				/* @__PURE__ */ jsx(Features, {}),
				/* @__PURE__ */ jsx(Screenshots, {}),
				/* @__PURE__ */ jsx(Platforms, {}),
				/* @__PURE__ */ jsx(WhatsNew, {}),
				/* @__PURE__ */ jsx(Reviews, {}),
				/* @__PURE__ */ jsx(Faq, {}),
				/* @__PURE__ */ jsx(FinalCta, {})
			]
		}),
		/* @__PURE__ */ jsx(Footer, {}),
		/* @__PURE__ */ jsx(StickyCta, {}),
		/* @__PURE__ */ jsx(Lightbox, {})
	] });
}
//#endregion
//#region src/seo/meta.ts
var SEO = {
	title: "ThreeBestRated App Download: Top 3 Local Businesses Near You",
	description: "Download the free ThreeBestRated app for iPhone, iPad and Android phones and tablets. See the top 3 verified local businesses in 200+ cities across 8 countries.",
	keywords: "ThreeBestRated app, download ThreeBestRated, ThreeBestRated iPhone app, ThreeBestRated iPad app, ThreeBestRated Android app, top 3 local businesses, best local services near me, best rated doctors near me, best lawyers near me, local business finder app",
	ogImage: `${SITE_URL}/og-image.png`,
	ogImageAlt: "ThreeBestRated app on a phone: only the top three local businesses near you",
	themeColor: "#112142",
	iosAppId: "1445667019"
};
var FONT_HREF = "https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@600;700&family=Barlow:wght@400;500;600&display=swap";
var heroShot = SCREENSHOT_SETS.phone[1].n;
var esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
/** Everything that belongs inside <head>, rendered to a string at build time. */
function buildHeadHtml(jsonLd) {
	const t = (name, content) => `<meta name="${name}" content="${esc(content)}" />`;
	const p = (property, content) => `<meta property="${property}" content="${esc(content)}" />`;
	const json = JSON.stringify(jsonLd).replace(/</g, "\\u003c");
	return [
		`<title>${esc(SEO.title)}</title>`,
		t("description", SEO.description),
		t("keywords", SEO.keywords),
		t("robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"),
		t("author", APP.name),
		t("theme-color", SEO.themeColor),
		t("apple-itunes-app", `app-id=${SEO.iosAppId}`),
		t("application-name", APP.name),
		t("apple-mobile-web-app-title", APP.name),
		`<link rel="canonical" href="${PAGE_URL}" />`,
		`<link rel="alternate" hreflang="en" href="${PAGE_URL}" />`,
		`<link rel="alternate" hreflang="x-default" href="${PAGE_URL}" />`,
		p("og:type", "website"),
		p("og:site_name", APP.name),
		p("og:locale", "en_US"),
		p("og:title", SEO.title),
		p("og:description", SEO.description),
		p("og:url", PAGE_URL),
		p("og:image", SEO.ogImage),
		p("og:image:width", "1200"),
		p("og:image:height", "630"),
		p("og:image:alt", SEO.ogImageAlt),
		t("twitter:card", "summary_large_image"),
		t("twitter:title", SEO.title),
		t("twitter:description", SEO.description),
		t("twitter:image", SEO.ogImage),
		t("twitter:image:alt", SEO.ogImageAlt),
		t("twitter:app:name:iphone", APP.name),
		t("twitter:app:id:iphone", SEO.iosAppId),
		t("twitter:app:name:googleplay", APP.name),
		t("twitter:app:id:googleplay", "com.allcountries.threebestrated"),
		`<link rel="icon" href="/stars.png?v=2" type="image/png" />`,
		`<link rel="apple-touch-icon" href="/apple-touch-icon.png" />`,
		`<link rel="manifest" href="/site.webmanifest" />`,
		`<link rel="preconnect" href="https://fonts.googleapis.com" />`,
		`<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />`,
		`<link rel="preload" as="image" type="image/webp" imagesrcset="${esc(shotSrcSet("phone", heroShot))}" imagesizes="${esc(PODIUM_SIZES)}" fetchpriority="high" />`,
		`<link rel="stylesheet" href="${esc(FONT_HREF)}" />`,
		`<script type="application/ld+json">${json}<\/script>`
	].join("\n    ");
}
//#endregion
//#region src/seo/schema.ts
/** One connected @graph: Organization, WebSite, WebPage, BreadcrumbList, the app itself and the FAQ. */
function buildJsonLd() {
	const orgId = `${SITE_URL}/#organization`;
	const appId = `${PAGE_URL}#app`;
	const pageId = `${PAGE_URL}#webpage`;
	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Organization",
				"@id": orgId,
				name: APP.name,
				legalName: APP.developer,
				url: SITE_URL,
				logo: {
					"@type": "ImageObject",
					url: `${SITE_URL}/icon-512.png`,
					width: 512,
					height: 512
				},
				contactPoint: {
					"@type": "ContactPoint",
					contactType: "customer support",
					email: APP.supportEmail,
					telephone: APP.phone,
					availableLanguage: [...APP.languages]
				},
				address: {
					"@type": "PostalAddress",
					streetAddress: "311 Ranch Road 620 S Ste 211",
					addressLocality: "Lakeway",
					addressRegion: "TX",
					postalCode: "78734-4776",
					addressCountry: "US"
				}
			},
			{
				"@type": "WebSite",
				"@id": `${SITE_URL}/#website`,
				url: SITE_URL,
				name: APP.name,
				publisher: { "@id": orgId },
				inLanguage: "en"
			},
			{
				"@type": "WebPage",
				"@id": pageId,
				url: PAGE_URL,
				name: SEO.title,
				description: SEO.description,
				inLanguage: "en",
				isPartOf: { "@id": `${SITE_URL}/#website` },
				primaryImageOfPage: {
					"@type": "ImageObject",
					url: SEO.ogImage
				},
				breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
				mainEntity: { "@id": appId }
			},
			{
				"@type": "BreadcrumbList",
				"@id": `${PAGE_URL}#breadcrumb`,
				itemListElement: [{
					"@type": "ListItem",
					position: 1,
					name: "Home",
					item: SITE_URL
				}, {
					"@type": "ListItem",
					position: 2,
					name: "Download the app",
					item: PAGE_URL
				}]
			},
			{
				"@type": "MobileApplication",
				"@id": appId,
				name: APP.fullName,
				alternateName: APP.name,
				description: SEO.description,
				applicationCategory: "BusinessApplication",
				operatingSystem: "Android, iOS",
				url: PAGE_URL,
				image: `${APP.iconUrl}=w512-h512`,
				screenshot: ALL_SCREENSHOTS.map((s) => ({
					"@type": "ImageObject",
					contentUrl: s.url,
					url: s.url,
					caption: s.alt,
					name: s.caption,
					encodingFormat: "image/webp",
					width: SHOT.width,
					height: SHOT.height
				})),
				availableOnDevice: [
					"iPhone",
					"iPad",
					"Android phones",
					"Android tablets"
				],
				isAccessibleForFree: true,
				featureList: [
					"Top three verified local businesses in every category",
					"50-point inspection by trained analysts",
					"AI assistant that matches a problem to the top three businesses",
					"Voice search",
					"Honest customer reviews",
					"GPS-based city detection across 200+ cities in 8 countries"
				],
				downloadUrl: [STORES.android.url, STORES.ios.url],
				installUrl: STORES.android.url,
				softwareVersion: "12.0.2",
				inLanguage: [...APP.languages],
				author: { "@id": orgId },
				publisher: { "@id": orgId },
				offers: {
					"@type": "Offer",
					price: "0",
					priceCurrency: "USD",
					availability: "https://schema.org/InStock"
				},
				aggregateRating: {
					"@type": "AggregateRating",
					ratingValue: COMBINED_RATING.value,
					ratingCount: COMBINED_RATING.count,
					bestRating: 5,
					worstRating: 1
				}
			},
			{
				"@type": "FAQPage",
				"@id": `${PAGE_URL}#faq`,
				mainEntity: FAQS.map((f) => ({
					"@type": "Question",
					name: f.q,
					acceptedAnswer: {
						"@type": "Answer",
						text: f.a
					}
				}))
			}
		]
	};
}
//#endregion
//#region src/entry-server.tsx
function render() {
	return {
		html: renderToString(/* @__PURE__ */ jsx(App, {})),
		head: buildHeadHtml(buildJsonLd())
	};
}
/** Feeds the image sitemap written by scripts/prerender.mjs. */
function sitemapImages() {
	return ALL_SCREENSHOTS.map((s) => ({
		loc: s.url,
		caption: s.alt,
		title: s.caption
	}));
}
//#endregion
export { render, sitemapImages };
