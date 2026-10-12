// CineGate Direct Link Gateway - Client Application Controller
// Handles catalog fetching, mode switching, deep-link router, and dynamic modal rendering

(function () {
  let catalog = {};
  let currentMode = "code";
  let activeMovie = null;

  // Fallback catalog for offline / file:// access
  const fallbackCatalog = {
    "101": {
      code: "101",
      display_code: "#101",
      title: "Dune: Part Two",
      year: "2024",
      imdb: "8.6/10",
      votes: "520K",
      runtime: "2h 46m",
      rating_guide: "PG-13",
      genres: ["Sci-Fi", "Adventure", "Action"],
      director: "Denis Villeneuve",
      cast: "Timothée Chalamet, Zendaya, Rebecca Ferguson",
      poster: "https://lh3.googleusercontent.com/aida-public/AB6AXuAt0qmxdy0rGYeuY5qkZgS-mbAFqPVqvYi89EigEvylS-FaWZIfG7gAonOe1jD9X4quSbuQBeF4H4iPHwZ0ZH4OWeltdQ0-XPSVwtN6x-TOgMN20LlZjHgJrOPU0SWvXhn2WdhaX72FCiGGaWnH_y9ykW8CsMiRwelLuWNCdpOZi0Rg1Za7P0lBV54SOrTP0qnMcsos96a1bWWP4ynyp87kCs5KIJ293_SNOmzqGFFeXi8HwWPOILjZWQ",
      synopsis: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
      cdn_server: "High-Speed CDN #1 Active (42 MB/s)",
      downloads: [
        { resolution: "4K UHD", quality_label: "2160p HDR • Dolby Atmos 7.1", size: "14.2 GB", badge: "Ultra HD", codec: "x265 10bit", url: "https://fastdl.zip/dune-part-two-2024-2160p-uhd" },
        { resolution: "2K QHD", quality_label: "1440p 10-bit x265", size: "6.8 GB", badge: "1440p", codec: "x265 10bit", url: "https://fastdl.zip/dune-part-two-2024-1440p-qhd" },
        { resolution: "1080p FHD", quality_label: "1080p BluRay • AAC 5.1", size: "2.4 GB", badge: "Most Popular", codec: "x264 BluRay", url: "https://fastdl.zip/dune-part-two-2024-1080p-fhd" },
        { resolution: "720p HD", quality_label: "720p Mobile Optimized", size: "980 MB", badge: "Fastest", codec: "x264 AAC", url: "https://fastdl.zip/dune-part-two-2024-720p-hd" }
      ],
      stream_url: "https://vcloud.zip/watch/dune-part-two-2024"
    },
    "102": {
      code: "102",
      display_code: "#102",
      title: "Interstellar",
      year: "2014",
      imdb: "8.7/10",
      votes: "2.1M",
      runtime: "2h 49m",
      rating_guide: "PG-13",
      genres: ["Sci-Fi", "Drama", "Adventure"],
      director: "Christopher Nolan",
      cast: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
      poster: "https://lh3.googleusercontent.com/aida-public/AB6AXuAelCxf0B5Y5EQnn9T16iATXqDt8lo5oYh5j3qM-IVl_9ULa2rl-pBEArI6PTPx7wQ6GLaxVgqdSxaN46Yxxh8geZb_UYoHIl8LcNgfxR989jrsjRYvQu0wzZqnZgCSIyvYZBO1c9ixPAQP1WxnDv6o9Yw474YfOY3GeKwSBjYJHBT1FwiJkgLA2kkNou4KnkroDHpJoEj-LGPUBnzsT3b831wzQDWSKIZ4fhqOMznRD6Y4rvjNxVpt2w",
      synopsis: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot is tasked to pilot a spacecraft along with a team of researchers to find a new planet for humans.",
      cdn_server: "High-Speed CDN #2 Active (48 MB/s)",
      downloads: [
        { resolution: "4K UHD", quality_label: "2160p IMAX Remaster • DTS-HD 5.1", size: "18.5 GB", badge: "IMAX 70mm", codec: "x265 10bit", url: "https://fastdl.zip/interstellar-2014-imax-2160p" },
        { resolution: "1080p FHD", quality_label: "1080p BluRay • AAC 5.1", size: "2.8 GB", badge: "Most Popular", codec: "x264 BluRay", url: "https://fastdl.zip/interstellar-2014-1080p-fhd" },
        { resolution: "720p HD", quality_label: "720p Mobile Optimized", size: "1.1 GB", badge: "Fastest", codec: "x264 AAC", url: "https://fastdl.zip/interstellar-2014-720p-hd" }
      ],
      stream_url: "https://vcloud.zip/watch/interstellar-2014"
    },
    "103": {
      code: "103",
      display_code: "#103",
      title: "Oppenheimer",
      year: "2023",
      imdb: "8.9/10",
      votes: "780K",
      runtime: "3h 00m",
      rating_guide: "R",
      genres: ["Biography", "Drama", "History"],
      director: "Christopher Nolan",
      cast: "Cillian Murphy, Emily Blunt, Matt Damon, Robert Downey Jr.",
      poster: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9vZ_KQ1-cXhQxnLZ5TUmHByXMf2K5H3yPlikT07bauMxfBNXAn8gPccTYSgOGH51Veo6kyM3Fh5XDvCyR5iBkaJwh6EOw7D-Rs983Fgvg2sHaPNbWxV0qhwvkqtAqfoZPwlyIaOZfjdUlfaelNp0JQc_Ou4T8gNVpgQDfLyoQQZFlQcF9txMTyPUO51NgxZpa-fIO-dtoAYexBtDe2t37cNN6Bbvi9JeJjZNGFRTeDtE6hDdXvsD45g",
      synopsis: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
      cdn_server: "High-Speed CDN #1 Active (45 MB/s)",
      downloads: [
        { resolution: "4K UHD", quality_label: "2160p UHD HDR • Dolby Atmos 7.1", size: "16.8 GB", badge: "Master 4K", codec: "x265 10bit", url: "https://fastdl.zip/oppenheimer-2023-2160p-uhd" },
        { resolution: "1080p FHD", quality_label: "1080p BluRay • AAC 5.1", size: "2.6 GB", badge: "Most Popular", codec: "x264 BluRay", url: "https://fastdl.zip/oppenheimer-2023-1080p-fhd" },
        { resolution: "720p HD", quality_label: "720p Mobile Optimized", size: "1.0 GB", badge: "Fastest", codec: "x264 AAC", url: "https://fastdl.zip/oppenheimer-2023-720p-hd" }
      ],
      stream_url: "https://vcloud.zip/watch/oppenheimer-2023"
    },
    "104": {
      code: "104",
      display_code: "#104",
      title: "Stree 2: Sarkate Ka Aatank",
      year: "2024",
      imdb: "7.8/10",
      votes: "120K",
      runtime: "2h 27m",
      rating_guide: "UA 16+",
      genres: ["Comedy", "Horror"],
      director: "Amar Kaushik",
      cast: "Shraddha Kapoor, Rajkummar Rao, Pankaj Tripathi",
      poster: "https://m.media-amazon.com/images/M/MV5BMjY5Mjk1ZDMtZjVkYy00MTBiLWI0ZTYtYzUzOGNmZmYzOWIzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
      synopsis: "After the events of Stree, the town of Chanderi faces a new terror: a headless demon named Sarkate who abducts modern, independent women.",
      cdn_server: "High-Speed CDN #3 Active (52 MB/s)",
      downloads: [
        { resolution: "4K UHD", quality_label: "2160p WEB-DL • Dolby Digital 5.1", size: "11.4 GB", badge: "4K UHD", codec: "x265 10bit", url: "https://fastdl.zip/stree-2-2024-2160p-web-dl" },
        { resolution: "1080p FHD", quality_label: "1080p WEB-DL • Hindi DD5.1", size: "2.2 GB", badge: "Most Popular", codec: "x264 WEB-DL", url: "https://fastdl.zip/stree-2-2024-1080p-web-dl" },
        { resolution: "720p HD", quality_label: "720p Mobile Optimized", size: "950 MB", badge: "Fastest", codec: "x264 AAC", url: "https://fastdl.zip/stree-2-2024-720p-web-dl" }
      ],
      stream_url: "https://vcloud.zip/watch/stree-2-2024"
    },
    "105": {
      code: "105",
      display_code: "#105",
      title: "Kantara: A Legend",
      year: "2022",
      imdb: "8.2/10",
      votes: "110K",
      runtime: "2h 28m",
      rating_guide: "UA 16+",
      genres: ["Action", "Adventure", "Drama", "Thriller"],
      director: "Rishab Shetty",
      cast: "Rishab Shetty, Kishore Kumar G., Achyuth Kumar",
      poster: "https://m.media-amazon.com/images/M/MV5BMjA0YjYyZGMtN2U0Ni00YmY4LWJkZTItYTMyMjY3NGYyMTJkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
      synopsis: "When greed paves the way for betrayal, scheming and murder, a young tribal man reluctantly dons the traditions of his ancestors to seek justice.",
      cdn_server: "High-Speed CDN #1 Active (44 MB/s)",
      downloads: [
        { resolution: "4K UHD", quality_label: "2160p Multi-Audio • Dolby Atmos", size: "13.8 GB", badge: "4K UHD", codec: "x265 10bit", url: "https://fastdl.zip/kantara-2022-2160p-uhd" },
        { resolution: "1080p FHD", quality_label: "1080p Hindi-Kannada Dual Audio", size: "2.5 GB", badge: "Most Popular", codec: "x264 WEB-DL", url: "https://fastdl.zip/kantara-2022-1080p-fhd" },
        { resolution: "720p HD", quality_label: "720p Mobile Optimized", size: "920 MB", badge: "Fastest", codec: "x264 AAC", url: "https://fastdl.zip/kantara-2022-720p-hd" }
      ],
      stream_url: "https://vcloud.zip/watch/kantara-2022"
    }
  };

  // 1. Fetch catalog data
  async function loadCatalog() {
    try {
      const res = await fetch("catalog.json");
      if (res.ok) {
        catalog = await res.json();
      } else {
        catalog = fallbackCatalog;
      }
    } catch (e) {
      catalog = fallbackCatalog;
    }
    checkUrlQueryParams();
  }

  // 2. Deep-linking: Auto-resolve if ?code=101 or ?post=101 in URL
  function checkUrlQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const codeParam = params.get("code") || params.get("post") || params.get("c");
    const movieParam = params.get("movie") || params.get("m");

    if (codeParam) {
      const cleanCode = codeParam.replace(/^#/, "").trim();
      const input = document.getElementById("movie-input");
      if (input) input.value = `#${cleanCode}`;
      resolveCode(cleanCode);
    } else if (movieParam) {
      const input = document.getElementById("movie-input");
      if (input) input.value = movieParam;
      resolveQuery(movieParam);
    }
  }

  // 3. Tab Switching
  window.setMode = function (mode) {
    currentMode = mode;
    const input = document.getElementById("movie-input");
    const icon = document.getElementById("input-lead-icon");
    const tabCode = document.getElementById("tab-code");
    const tabMovie = document.getElementById("tab-movie");
    const tabDirect = document.getElementById("tab-direct");

    hideFeedback();

    const inactiveClass = "flex-1 py-1.5 px-2 rounded-lg text-xs font-heading text-on-surface-variant hover:text-white transition-all text-center flex items-center justify-center gap-1";
    const activeClass = "flex-1 py-1.5 px-2 rounded-lg text-xs font-heading font-semibold text-on-primary bg-primary-container shadow-sm transition-all text-center flex items-center justify-center gap-1";

    tabCode.className = inactiveClass;
    tabMovie.className = inactiveClass;
    tabDirect.className = inactiveClass;

    if (mode === "code") {
      tabCode.className = activeClass;
      icon.innerText = "tag";
      input.placeholder = "# (e.g. #101, #102, #104)";
    } else if (mode === "movie") {
      tabMovie.className = activeClass;
      icon.innerText = "search";
      input.placeholder = "Enter Movie Name (e.g. Dune, Stree 2)...";
    } else {
      tabDirect.className = activeClass;
      icon.innerText = "link";
      input.placeholder = "Paste Instagram Reel or YouTube Shorts URL...";
    }
    input.focus();
  };

  // 4. Quick fill from trending pills
  window.fillCode = function (code) {
    const input = document.getElementById("movie-input");
    input.value = code;
    window.setMode("code");
    triggerUnlock();
  };

  // 5. Native Clipboard Paste
  window.handlePaste = async function () {
    const input = document.getElementById("movie-input");
    const pasteBtn = document.getElementById("paste-btn");

    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text && text.trim()) {
          input.value = text.trim();
          showFeedback("Pasted from clipboard", "info");
          setTimeout(triggerUnlock, 300);
          return;
        }
      }
    } catch (e) {
      // Permission denied or unsupported
    }
    input.focus();
  };

  // 6. Enter key handling
  window.handleKeyDown = function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      triggerUnlock();
    }
  };

  // 7. Focus input helper
  window.focusInput = function () {
    const input = document.getElementById("movie-input");
    if (input) {
      input.scrollIntoView({ behavior: "smooth", block: "center" });
      input.focus();
    }
  };

  // 8. Toggle How It Works drawer
  window.toggleHowItWorks = function () {
    const drawer = document.getElementById("how-it-works-drawer");
    if (drawer) {
      drawer.classList.toggle("hidden");
      drawer.classList.toggle("flex");
    }
  };

  // 9. Browse all catalog movies
  window.browseAllCatalog = function () {
    const keys = Object.keys(catalog);
    if (keys.length > 0) {
      const firstCode = keys[0];
      resolveCode(firstCode);
    }
  };

  // 10. Main Trigger Unlock Action
  window.triggerUnlock = function () {
    const input = document.getElementById("movie-input");
    const rawVal = (input ? input.value : "").trim();

    if (!rawVal) {
      showError("Please enter a post code (e.g. #101) or movie name");
      return;
    }

    // Direct URL handling
    if (rawVal.startsWith("http://") || rawVal.startsWith("https://")) {
      showFeedback("Resolving movie link from reel metadata...", "info");
      setTimeout(() => {
        // Fallback demo resolution for direct reel link
        resolveCode("101");
      }, 700);
      return;
    }

    // Try resolving as numeric code first
    const cleanCode = rawVal.replace(/^#/, "").trim();
    if (/^\d+$/.test(cleanCode)) {
      resolveCode(cleanCode);
    } else {
      resolveQuery(rawVal);
    }
  };

  // 11. Code resolver
  function resolveCode(code) {
    hideFeedback();
    const movie = catalog[code] || Object.values(catalog).find(m => m.code === code || m.display_code === `#${code}`);

    if (movie) {
      displayMovieUnlock(movie);
      // Update URL search query without reload
      if (window.history && window.history.pushState) {
        const newUrl = window.location.pathname + `?code=${movie.code}`;
        window.history.pushState({ path: newUrl }, "", newUrl);
      }
    } else {
      showError(`Code #${code} not found in cinema catalog. Try trending codes below!`);
    }
  }

  // 12. Text query resolver
  function resolveQuery(query) {
    hideFeedback();
    const clean = query.toLowerCase().replace(/[^a-z0-9]/g, "");
    const movie = Object.values(catalog).find(m => {
      const mTitle = (m.title || "").toLowerCase().replace(/[^a-z0-9]/g, "");
      return mTitle.includes(clean) || clean.includes(mTitle);
    });

    if (movie) {
      displayMovieUnlock(movie);
      if (window.history && window.history.pushState) {
        const newUrl = window.location.pathname + `?code=${movie.code}`;
        window.history.pushState({ path: newUrl }, "", newUrl);
      }
    } else {
      showError(`Movie "${query}" not found. Enter the 3 or 4-digit post code from the reel!`);
    }
  }

  // 13. Render Unlocked Modal
  function displayMovieUnlock(movie) {
    activeMovie = movie;

    document.getElementById("modal-code-tag").innerText = `Gateway Verified ${movie.display_code || '#' + movie.code}`;
    document.getElementById("modal-poster").src = movie.poster || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba";
    document.getElementById("modal-year-badge").innerText = movie.year || "2024";
    document.getElementById("modal-rating-guide").innerText = movie.rating_guide || "PG-13";
    document.getElementById("modal-runtime").innerText = movie.runtime || "2h 15m";
    document.getElementById("modal-genres").innerText = (movie.genres || []).join(" / ") || "Cinema";
    document.getElementById("modal-title").innerText = movie.title || "Cinema Master";
    document.getElementById("modal-imdb").innerText = (movie.imdb || "8.5").replace("/10", "");
    document.getElementById("modal-votes").innerText = `(${movie.votes || '250K'})`;
    document.getElementById("modal-synopsis").innerText = movie.synopsis || "High-octane cinema presentation ready for direct download in ultra-high fidelity.";
    document.getElementById("modal-director").innerText = movie.director || "Master Director";
    document.getElementById("modal-cast").innerText = movie.cast || "Ensemble Cast";
    document.getElementById("modal-cdn-server").innerText = movie.cdn_server || "High-Speed CDN #1 Active (45 MB/s)";

    // Render Download Mirror Cards
    const container = document.getElementById("download-cards-container");
    container.innerHTML = "";

    const downloads = movie.downloads || [
      { resolution: "4K UHD", quality_label: "2160p UHD • Dolby Atmos", size: "14.2 GB", badge: "Ultra HD", url: movie.stream_url || "#" },
      { resolution: "1080p FHD", quality_label: "1080p BluRay • AAC 5.1", size: "2.4 GB", badge: "Most Popular", url: movie.stream_url || "#" },
      { resolution: "720p HD", quality_label: "720p Mobile Optimized", size: "980 MB", badge: "Fastest", url: movie.stream_url || "#" }
    ];

    downloads.forEach((dl, idx) => {
      const isTopTier = idx === 0;
      const card = document.createElement("div");

      if (isTopTier) {
        // Hero 4K Card
        card.className = "relative p-4 rounded-2xl bg-primary-container text-on-primary-container flex flex-col gap-3 shadow-lg border border-primary/20";
        card.innerHTML = `
          <div class="flex items-start justify-between">
            <div class="flex flex-col">
              <div class="flex items-center gap-2">
                <span class="font-heading text-lg font-bold text-on-primary-container">${dl.resolution}</span>
                <span class="px-2 py-0.5 rounded-full bg-on-primary-container text-primary-container text-[10px] font-heading font-bold">${dl.badge || 'Ultra HD'}</span>
              </div>
              <p class="text-xs opacity-90 mt-0.5">${dl.quality_label || 'Direct Mirror'}</p>
            </div>
            <div class="text-right">
              <span class="font-heading text-lg font-bold text-on-primary-container">${dl.size || 'Direct'}</span>
              <p class="text-[10px] opacity-80 mt-0.5 font-mono">${dl.codec || 'x265 10bit'}</p>
            </div>
          </div>
          <a href="${dl.url}" target="_blank" rel="noopener noreferrer" class="w-full h-11 rounded-xl bg-on-primary-container text-primary-container font-heading text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:opacity-95 transition-all active:scale-[0.98]">
            <span class="material-symbols-outlined text-[19px]">download</span>
            <span>Download ${dl.resolution}</span>
          </a>
        `;
      } else {
        // Standard Resolution Card
        card.className = "p-3.5 rounded-2xl bg-surface-container flex items-center justify-between border border-white/5";
        card.innerHTML = `
          <div class="flex flex-col">
            <div class="flex items-center gap-2">
              <span class="font-heading text-base font-bold text-white">${dl.resolution}</span>
              <span class="text-[10px] font-heading font-bold text-on-surface-variant px-1.5 py-0.5 rounded bg-surface-container-high">${dl.badge || dl.resolution}</span>
            </div>
            <p class="text-xs text-on-surface-variant mt-0.5">${dl.quality_label || 'High Speed'}</p>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs font-medium text-white">${dl.size || ''}</span>
            <a href="${dl.url}" target="_blank" rel="noopener noreferrer" class="h-9 px-3 rounded-lg bg-surface-container-high text-primary hover:bg-surface-bright text-xs font-heading font-semibold flex items-center gap-1.5 transition-colors border border-white/5">
              <span class="material-symbols-outlined text-[16px]">download</span>
              <span>Download</span>
            </a>
          </div>
        `;
      }
      container.appendChild(card);
    });

    // Open Modal
    const modal = document.getElementById("unlocked-modal");
    modal.classList.remove("opacity-0", "pointer-events-none");
    modal.classList.add("opacity-100");
  }

  // 14. Close Unlocked Modal
  window.closeUnlockedModal = function () {
    const modal = document.getElementById("unlocked-modal");
    modal.classList.remove("opacity-100");
    modal.classList.add("opacity-0", "pointer-events-none");
  };

  // 15. Stream Now action
  window.triggerStream = function () {
    if (activeMovie && activeMovie.stream_url) {
      window.open(activeMovie.stream_url, "_blank");
    } else if (activeMovie && activeMovie.downloads && activeMovie.downloads[0]) {
      window.open(activeMovie.downloads[0].url, "_blank");
    } else {
      showFeedback("Stream mirror preparing...", "info");
    }
  };

  // 16. Copy CDN Link action
  window.copyCdnLink = function () {
    if (!activeMovie) return;
    const url = activeMovie.stream_url || (activeMovie.downloads && activeMovie.downloads[0] ? activeMovie.downloads[0].url : window.location.href);

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        const textSpan = document.getElementById("copy-cdn-text");
        const btn = document.getElementById("copy-cdn-btn");
        const orig = textSpan.innerText;
        textSpan.innerText = "CDN Link Copied!";
        btn.classList.add("text-primary", "border-primary");
        setTimeout(() => {
          textSpan.innerText = orig;
          btn.classList.remove("text-primary", "border-primary");
        }, 2200);
      });
    }
  };

  // 17. Error & Feedback alert helper
  function showError(msg) {
    const inputWrapper = document.getElementById("input-wrapper");
    const feedback = document.getElementById("feedback-alert");
    const feedbackMsg = document.getElementById("feedback-msg");
    const feedbackIcon = document.getElementById("feedback-icon");

    inputWrapper.classList.add("border-rose-500/70", "animate-shake");
    setTimeout(() => {
      inputWrapper.classList.remove("animate-shake");
    }, 450);

    feedback.className = "flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/30 text-xs font-medium transition-all animate-fadeIn";
    feedbackIcon.innerText = "error";
    feedbackMsg.innerText = msg;
  }

  function showFeedback(msg, type = "info") {
    const feedback = document.getElementById("feedback-alert");
    const feedbackMsg = document.getElementById("feedback-msg");
    const feedbackIcon = document.getElementById("feedback-icon");

    feedback.className = "flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 text-xs font-medium transition-all animate-fadeIn";
    feedbackIcon.innerText = type === "info" ? "info" : "check_circle";
    feedbackMsg.innerText = msg;
  }

  function hideFeedback() {
    const inputWrapper = document.getElementById("input-wrapper");
    const feedback = document.getElementById("feedback-alert");
    inputWrapper.classList.remove("border-rose-500/70", "animate-shake");
    feedback.classList.add("hidden");
    feedback.classList.remove("flex");
  }

  // Initialize
  document.addEventListener("DOMContentLoaded", loadCatalog);
})();
