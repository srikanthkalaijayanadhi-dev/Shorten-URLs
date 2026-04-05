/**
 * SnipAd Global Ad Loader  (assets/ads.js)
 * Include AFTER supabase.js on any page.
 * Reads admin-configured ad settings from Supabase settings table
 * and injects live ad code into every ad slot on the page.
 */
(async function () {
    if (!window.supabaseClient) return;

    const KEYS = [
        'global_ads_enabled',
        'global_header_script_enabled', 'global_header_script',
        'global_top_banner_enabled',    'global_top_banner_code',
        'global_bottom_banner_enabled', 'global_bottom_banner_code',
        'global_sidebar_ad_enabled',    'global_sidebar_ad_code',
        'global_square_ad_enabled',     'global_square_ad_code',
        'global_mid_ad_enabled',        'global_mid_ad_code',
        'global_popup_enabled',         'global_popup_code',
        'global_sticky_banner_enabled', 'global_sticky_banner_code'
    ];

    let S = {};
    try {
        const { data } = await window.supabaseClient
            .from('settings').select('key, value').in('key', KEYS);
        (data || []).forEach(r => S[r.key] = r.value);
    } catch (e) { console.warn('[SnipAd Ads] Could not load ad settings:', e); }

    // ── Master switch ──────────────────────────────
    if (S['global_ads_enabled'] === 'false') return;

    // ── 1. Header Script ──────────────────────────
    if (S['global_header_script_enabled'] === 'true') {
        _injectHead(S['global_header_script'] || '');
    }

    // ── 2. Top Banners (.ad-slot-top) ─────────────
    if (S['global_top_banner_enabled'] !== 'false') {
        _injectSlots('.ad-slot-top', S['global_top_banner_code'] || '');
    }

    // ── 3. Bottom Banners (.ad-slot-bottom) ───────
    if (S['global_bottom_banner_enabled'] !== 'false') {
        _injectSlots('.ad-slot-bottom', S['global_bottom_banner_code'] || '');
    }

    // ── 4. Sidebar Ads (.ad-slot-sidebar) ─────────
    if (S['global_sidebar_ad_enabled'] !== 'false') {
        _injectSlots('.ad-slot-sidebar', S['global_sidebar_ad_code'] || '');
    }

    // ── 5. Square Ads (.ad-slot-square) ───────────
    if (S['global_square_ad_enabled'] !== 'false') {
        _injectSlots('.ad-slot-square', S['global_square_ad_code'] || '');
    }

    // ── 6. Mid / In-Content (.ad-slot-mid) ────────
    if (S['global_mid_ad_enabled'] !== 'false') {
        _injectSlots('.ad-slot-mid', S['global_mid_ad_code'] || '');
    }

    // ── 6. Extra banner slots (.ad-slot-extra) ────
    // Uses same code as top banner by default
    if (S['global_top_banner_enabled'] !== 'false') {
        _injectSlots('.ad-slot-extra', S['global_top_banner_code'] || '');
    }

    // ── 7. Native / in-content (.ad-slot-native) ──
    if (S['global_mid_ad_enabled'] !== 'false') {
        _injectSlots('.ad-slot-native', S['global_mid_ad_code'] || '');
    }

    // ── 8. Pop-up / Interstitial ──────────────────
    if (S['global_popup_enabled'] === 'true') {
        _injectHead(S['global_popup_code'] || '');
    }

    // ── 9. Sticky Bottom Banner ──────────────────
    if (S['global_sticky_banner_enabled'] !== 'false' && S['global_sticky_banner_code']) {
        const sticky = document.createElement('div');
        sticky.className = 'ad-slot-sticky-bottom';
        sticky.id = 'sticky-bottom-ad';
        document.body.appendChild(sticky);
        _injectSlots('#sticky-bottom-ad', S['global_sticky_banner_code']);
    }

    // ─────────────────────────────────────────────
    function _injectSlots(selector, code) {
        document.querySelectorAll(selector).forEach(el => {
            if (!code.trim()) return;
            el.innerHTML = code;
            el.querySelectorAll('script').forEach(old => {
                const n = document.createElement('script');
                [...old.attributes].forEach(a => n.setAttribute(a.name, a.value));
                n.textContent = old.textContent;
                old.parentNode.replaceChild(n, old);
            });
            el.classList.add('ad-live');
        });
    }

    function _injectHead(code) {
        if (!code.trim()) return;
        const temp = document.createElement('div');
        temp.innerHTML = code;
        [...temp.childNodes].forEach(node => {
            if (node.nodeType !== 1) return;
            const tag = node.tagName.toLowerCase();
            let el;
            if (tag === 'script') {
                el = document.createElement('script');
                [...node.attributes].forEach(a => el.setAttribute(a.name, a.value));
                el.textContent = node.textContent;
            } else if (tag === 'link') {
                el = document.createElement('link');
                [...node.attributes].forEach(a => el.setAttribute(a.name, a.value));
            } else if (tag === 'meta') {
                el = document.createElement('meta');
                [...node.attributes].forEach(a => el.setAttribute(a.name, a.value));
            } else { el = node.cloneNode(true); }
            document.head.appendChild(el);
        });
    }
})();
