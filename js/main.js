/* ============================================================
   AfriTalent — main.js
   Auteur    : [Ton Prénom NOM]
   Classe    : Licence 1 Informatique
   Date      : 2026
   Description : JavaScript vanilla uniquement — pas de jQuery
   ============================================================ */
   


/* ============================================================
   1. ANNÉE DYNAMIQUE DANS LE FOOTER
   ============================================================ */

const yearElements = document.querySelectorAll('#currentYear');
yearElements.forEach(function(el) {
  el.textContent = new Date().getFullYear();
});


/* ============================================================
   2. MOTIF DE FOND (appliqué sur les deux thèmes)
   Le motif change de couleur selon le thème actif
   ============================================================ */

// Fonction qui applique le motif selon le thème
function appliquerMotif(isDark) {
  if (isDark) {
    // Motif dark : points orangés très discrets
    document.body.style.backgroundImage =
      'radial-gradient(rgba(245,166,35,0.06) 1px, transparent 1px)';
    document.body.style.backgroundSize = '28px 28px';
  } else {
    // Motif light : points gris très discrets
    document.body.style.backgroundImage =
      'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)';
    document.body.style.backgroundSize = '28px 28px';
  }
}


/* ============================================================
   3. DARK MODE / LIGHT MODE
   - Toggle dans la navbar
   - Choix sauvegardé dans localStorage
   ============================================================ */

const darkModeBtn = document.getElementById('darkModeToggle');
const darkModeIcon = darkModeBtn ? darkModeBtn.querySelector('i') : null;

// Active le dark mode
function activerDarkMode() {
  document.body.classList.add('dark-mode');

  // Change l'icône en soleil
  if (darkModeIcon) {
    darkModeIcon.classList.remove('bi-moon-fill');
    darkModeIcon.classList.add('bi-sun-fill');
  }

  // Met à jour l'aria-label
  if (darkModeBtn) {
    darkModeBtn.setAttribute('aria-label', 'Activer le mode clair');
  }

  // Applique le motif dark
  appliquerMotif(true);

  // Sauvegarde dans localStorage
  localStorage.setItem('theme', 'dark');
}

// Active le light mode
function activerLightMode() {
  document.body.classList.remove('dark-mode');

  // Remet l'icône en lune
  if (darkModeIcon) {
    darkModeIcon.classList.remove('bi-sun-fill');
    darkModeIcon.classList.add('bi-moon-fill');
  }

  // Met à jour l'aria-label
  if (darkModeBtn) {
    darkModeBtn.setAttribute('aria-label', 'Activer le mode sombre');
  }

  // Applique le motif light
  appliquerMotif(false);

  // Sauvegarde dans localStorage
  localStorage.setItem('theme', 'light');
}

// Au chargement : on lit le thème sauvegardé
const themeSauvegarde = localStorage.getItem('theme');

if (themeSauvegarde === 'dark') {
  activerDarkMode();
} else {
  activerLightMode();
}

// Clic sur le bouton : on bascule entre les deux
if (darkModeBtn) {
  darkModeBtn.addEventListener('click', function() {
    if (document.body.classList.contains('dark-mode')) {
      activerLightMode();
    } else {
      activerDarkMode();
    }
  });
}


/* ============================================================
   4. NAVBAR DYNAMIQUE AU SCROLL
   ============================================================ */

const navbar = document.getElementById('mainNavbar');

function gererNavbarScroll() {
  if (window.scrollY > 50) {
    navbar.classList.add('navbar-scrolled');
  } else {
    navbar.classList.remove('navbar-scrolled');
  }
}

if (navbar) {
  window.addEventListener('scroll', gererNavbarScroll);
  gererNavbarScroll();
}


/* ============================================================
   5. BOUTON RETOUR EN HAUT
   ============================================================ */

const backToTopBtn = document.getElementById('backToTop');

  function gererBackToTop() {
  if (window.scrollY > 300) {
    // On ajoute la classe visible — le CSS s'occupe de l'affichage
    backToTopBtn.classList.add('visible');
  } else {
    // On retire la classe visible
    backToTopBtn.classList.remove('visible');
  }
}

if (backToTopBtn) {
  window.addEventListener('scroll', gererBackToTop);

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// alouter dess motifs circulaires sur le fond de la page, avec des couleurs différentes selon le thème (clair ou sombre).



/* ============================================================
   6. COMPTEURS ANIMÉS — Commit 7
   ============================================================ */

// Sera implémenté au Commit 7 avec IntersectionObserver


/* ============================================================
   7. ANIMATIONS FADE-IN — Commit 7
   ============================================================ */

// Sera implémenté au Commit 7 avec IntersectionObserver


/* ============================================================
   8. FILTRAGE DYNAMIQUE DES FREELANCES — Commit 8
   ============================================================ */

// Sera implémenté au Commit 8


/* ============================================================
   9. VALIDATION DU FORMULAIRE — Commit 8
   ============================================================ */

// Sera implémenté au Commit 8