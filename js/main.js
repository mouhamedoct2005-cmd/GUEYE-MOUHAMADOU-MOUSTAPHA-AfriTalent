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


// On sélectionne tous les éléments avec la classe stat-number
const statElements = document.querySelectorAll('.stat-number');

// Fonction qui anime un compteur de 0 jusqu'à sa valeur cible
function animerCompteur(element) {

  // On lit la valeur cible depuis l'attribut data-target
  const cible = parseInt(element.getAttribute('data-target'));

  // Valeur de départ
  let valeurActuelle = 0;

  // On calcule le pas d'incrémentation
  // Plus la cible est grande, plus le pas est grand
  const pas = Math.ceil(cible / 80);

  // On crée un intervalle qui s'exécute toutes les 20ms
  const intervalle = setInterval(function() {

    // On ajoute le pas à la valeur actuelle
    valeurActuelle += pas;

    // Si on dépasse la cible, on s'arrête exactement à la cible
    if (valeurActuelle >= cible) {
      valeurActuelle = cible;
      clearInterval(intervalle); // On arrête l'intervalle
    }

    // On affiche la valeur avec un séparateur de milliers
    // ex: 12000 → 12 000
    element.textContent = valeurActuelle.toLocaleString('fr-FR');

  }, 20);
}

// On crée un IntersectionObserver pour détecter
// quand les compteurs entrent dans le viewport
const observateurCompteurs = new IntersectionObserver(function(entries) {

  entries.forEach(function(entry) {

    // Si l'élément est visible dans le viewport
    if (entry.isIntersecting) {

      // On lance l'animation du compteur
      animerCompteur(entry.target);

      // On arrête d'observer cet élément
      // pour que l'animation ne se relance pas
      observateurCompteurs.unobserve(entry.target);
    }
  });

}, {
  // L'animation se déclenche quand 20% de l'élément est visible
  threshold: 0.2
});

// On observe chaque élément stat-number
statElements.forEach(function(el) {
  // On remet à 0 avant d'observer
  el.textContent = '0';
  observateurCompteurs.observe(el);
});


/* ============================================================
   7. ANIMATIONS FADE-IN AU SCROLL
   - Les sections apparaissent en fondu quand elles entrent
     dans le viewport
   - Utilise IntersectionObserver
   ============================================================ */

// On sélectionne toutes les sections et articles à animer
const elementsAAnimer = document.querySelectorAll(
  'section, article, .card, .bento-card, .freelance-card, .pricing-card, .team-card, .valeur-card, .category-card'
);

// On crée un IntersectionObserver pour le fade-in
const observateurFadeIn = new IntersectionObserver(function(entries) {

  entries.forEach(function(entry) {

    // Si l'élément est visible dans le viewport
    if (entry.isIntersecting) {

      // On ajoute la classe qui déclenche l'animation CSS
      entry.target.classList.add('fade-in-visible');

      // On arrête d'observer une fois animé
      observateurFadeIn.unobserve(entry.target);
    }
  });

}, {
  // L'animation se déclenche quand 10% de l'élément est visible
  threshold: 0.1
});

// On observe chaque élément
elementsAAnimer.forEach(function(el) {
  // On ajoute la classe de départ (invisible)
  el.classList.add('fade-in-init');
  // On commence à observer
  observateurFadeIn.observe(el);
});


/* ============================================================
   8. FILTRAGE DYNAMIQUE DES FREELANCES
   - Les cartes se filtrent par catégorie sans rechargement
   - Fonctionne sur freelances.html uniquement
   ============================================================ */

// On sélectionne tous les boutons de filtre
const boutonsFiltre = document.querySelectorAll('.btn-filter');

// On sélectionne toutes les cartes freelances
const cartesFreelances = document.querySelectorAll('.freelance-item');

// On sélectionne le message "aucun résultat"
const messageAucunResultat = document.getElementById('noResult');

// On vérifie qu'on est bien sur la page freelances
// (les boutons de filtre n'existent que sur cette page)
if (boutonsFiltre.length > 0) {

  // On écoute le clic sur chaque bouton de filtre
  boutonsFiltre.forEach(function(bouton) {

    bouton.addEventListener('click', function() {

      // --- Étape 1 : mettre à jour le bouton actif ---

      // On retire la classe active de tous les boutons
      boutonsFiltre.forEach(function(btn) {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      });

      // On ajoute la classe active au bouton cliqué
      bouton.classList.add('active');
      bouton.setAttribute('aria-pressed', 'true');

      // --- Étape 2 : récupérer la catégorie choisie ---

      // On lit la valeur data-category du bouton cliqué
      const categorieChoisie = bouton.getAttribute('data-category');

      // --- Étape 3 : afficher/masquer les cartes ---

      let nombreVisible = 0; // Compteur de cartes visibles

      cartesFreelances.forEach(function(carte) {

        // On lit la catégorie de la carte
        const categorieCarte = carte.getAttribute('data-category');

        // Si "tous" est sélectionné OU si la catégorie correspond
        if (categorieChoisie === 'tous' || categorieCarte === categorieChoisie) {

          // On affiche la carte
          carte.style.display = 'block';
          nombreVisible++;

        } else {

          // On cache la carte
          carte.style.display = 'none';
        }
      });

      // --- Étape 4 : afficher message si aucun résultat ---

      if (messageAucunResultat) {
        if (nombreVisible === 0) {
          messageAucunResultat.style.display = 'block';
        } else {
          messageAucunResultat.style.display = 'none';
        }
      }

    }); // fin addEventListener
  }); // fin forEach boutons
} // fin if boutonsFiltre


/* ============================================================
   9. VALIDATION DU FORMULAIRE DE CONTACT
   - Tous les champs requis vérifiés
   - Format email vérifié par regex
   - Longueur minimum du message (20 caractères)
   - Messages d'erreur sous chaque champ
   - Message de succès après soumission
   - Fonctionne sur contact.html uniquement
   ============================================================ */

// On sélectionne le bouton d'envoi
const btnEnvoyer = document.getElementById('submitBtn');

// On vérifie qu'on est bien sur la page contact
if (btnEnvoyer) {

  // --- Fonction utilitaire : afficher une erreur ---
  function afficherErreur(idChamp, message) {

    const champ = document.getElementById(idChamp);
    const erreur = document.getElementById(idChamp + '-error');

    if (champ) {
      // Bordure rouge sur le champ
      champ.classList.remove('is-valid');
      champ.classList.add('is-invalid');
    }

    if (erreur) {
      // On affiche le message d'erreur
      erreur.textContent = message;
    }
  }

  // --- Fonction utilitaire : afficher un succès ---
  function afficherSucces(idChamp) {

    const champ = document.getElementById(idChamp);
    const erreur = document.getElementById(idChamp + '-error');

    if (champ) {
      // Bordure verte sur le champ
      champ.classList.remove('is-invalid');
      champ.classList.add('is-valid');
    }

    if (erreur) {
      // On efface le message d'erreur
      erreur.textContent = '';
    }
  }

  // --- Fonction utilitaire : réinitialiser un champ ---
  function reinitialiserChamp(idChamp) {

    const champ = document.getElementById(idChamp);
    const erreur = document.getElementById(idChamp + '-error');

    if (champ) {
      champ.classList.remove('is-valid', 'is-invalid');
    }

    if (erreur) {
      erreur.textContent = '';
    }
  }

  // --- Fonction principale : valider le formulaire ---
  function validerFormulaire() {

    // On suppose que le formulaire est valide
    let formulaireValide = true;

    // ---- Validation du champ NOM ----
    
const nom = document.getElementById('nom');

// Regex qui accepte uniquement les lettres (accents compris), espaces et tirets
const regexNom = /^[a-zA-ZÀ-ÿ\s\-']+$/;

if (nom) {
  if (nom.value.trim() === '') {
    afficherErreur('nom', 'Le nom est obligatoire.');
    formulaireValide = false;
  } else if (nom.value.trim().length < 2) {
    afficherErreur('nom', 'Le nom doit contenir au moins 2 caractères.');
    formulaireValide = false;
  } else if (!regexNom.test(nom.value.trim())) {
    afficherErreur('nom', 'Le nom ne doit contenir que des lettres.');
    formulaireValide = false;
  } else {
    afficherSucces('nom');
  }
}

    // ---- Validation du champ PRÉNOM ----
    
const prenom = document.getElementById('prenom');

// Même regex que le nom
const regexPrenom = /^[a-zA-ZÀ-ÿ\s\-']+$/;

if (prenom) {
  if (prenom.value.trim() === '') {
    afficherErreur('prenom', 'Le prénom est obligatoire.');
    formulaireValide = false;
  } else if (prenom.value.trim().length < 2) {
    afficherErreur('prenom', 'Le prénom doit contenir au moins 2 caractères.');
    formulaireValide = false;
  } else if (!regexPrenom.test(prenom.value.trim())) {
    afficherErreur('prenom', 'Le prénom ne doit contenir que des lettres.');
    formulaireValide = false;
  } else {
    afficherSucces('prenom');
  }
}

    // ---- Validation du champ EMAIL ----
    const email = document.getElementById('email');

    if (email) {

      // Regex pour vérifier le format de l'email
      // ex: exemple@domaine.com
      const regexEmail = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

      if (email.value.trim() === '') {
        afficherErreur('email', "L'email est obligatoire.");
        formulaireValide = false;
      } else if (!regexEmail.test(email.value.trim())) {
        afficherErreur('email', "Le format de l'email est invalide. Ex: nom@domaine.com");
        formulaireValide = false;
      } else {
        afficherSucces('email');
      }
    }

    // ---- Validation du champ SUJET ----
    const sujet = document.getElementById('sujet');

    if (sujet) {
      if (sujet.value === '' || sujet.value === null) {
        afficherErreur('sujet', 'Veuillez choisir un sujet.');
        formulaireValide = false;
      } else {
        afficherSucces('sujet');
      }
    }

    // ---- Validation du champ MESSAGE ----
    const message = document.getElementById('message');

    if (message) {
      if (message.value.trim() === '') {
        afficherErreur('message', 'Le message est obligatoire.');
        formulaireValide = false;
      } else if (message.value.trim().length < 20) {
        afficherErreur('message',
          'Le message doit contenir au moins 20 caractères. ' +
          '(' + message.value.trim().length + '/20)'
        );
        formulaireValide = false;
      } else {
        afficherSucces('message');
      }
    }

    return formulaireValide;
  }

  // --- Écoute du clic sur le bouton Envoyer ---
  btnEnvoyer.addEventListener('click', function() {

    // On lance la validation
    const estValide = validerFormulaire();

    // Si tout est valide
    if (estValide) {

      // On affiche le message de succès
      const msgSucces = document.getElementById('successMsg');

      if (msgSucces) {
        msgSucces.style.display = 'block';
        msgSucces.classList.remove('d-none');
      }

      // On désactive le bouton pour éviter un double envoi
      btnEnvoyer.disabled = true;
      btnEnvoyer.textContent = '✓ Message envoyé !';

      // On réinitialise tous les champs après 4 secondes
      setTimeout(function() {

        // Réinitialisation des champs
        const champs = ['nom', 'prenom', 'email', 'sujet', 'message'];
        champs.forEach(function(id) {
          const champ = document.getElementById(id);
          if (champ) {
            champ.value = '';
            reinitialiserChamp(id);
          }
        });

        // On cache le message de succès
        if (msgSucces) {
          msgSucces.style.display = 'none';
        }

        // On réactive le bouton
        btnEnvoyer.disabled = false;
        btnEnvoyer.innerHTML = '<i class="bi bi-send-fill me-2"></i> Envoyer le message';

      }, 4000);
    }
  });

  // --- Validation en temps réel ---
  // Les erreurs disparaissent dès que l'utilisateur corrige

  const champsAValider = ['nom', 'prenom', 'email', 'sujet', 'message'];

  champsAValider.forEach(function(id) {

    const champ = document.getElementById(id);

    if (champ) {
      // On écoute la saisie en temps réel
      champ.addEventListener('input', function() {

        // Si le champ n'est plus vide, on retire l'erreur
        if (champ.value.trim() !== '') {
          reinitialiserChamp(id);
        }
      });
    }
  });

} // fin if btnEnvoyer

/* ============================================================
   10. ANIMATION ÉTOILES AVANCÉE
   - Étoiles de différentes formes et tailles
   - Traînées lumineuses (shooting stars)
   - Pulsation et rotation
   - Adaptation au thème
   ============================================================ */

// ---- Conteneur principal ----
const conteneurEtoiles = document.createElement('div');
conteneurEtoiles.id = 'etoiles-bg';
conteneurEtoiles.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`;
document.body.appendChild(conteneurEtoiles);

// ---- Injection des keyframes CSS ----
const styleEtoiles = document.createElement('style');
styleEtoiles.textContent = `

  /* Scintillement simple */
  @keyframes scintiller {
    0%   { opacity: 0.1; transform: scale(0.6); }
    50%  { opacity: 1;   transform: scale(1.5); }
    100% { opacity: 0.2; transform: scale(0.8); }
  }

  /* Pulsation avec halo */
  @keyframes pulser {
    0%   { opacity: 0.2; transform: scale(0.8);  box-shadow: 0 0 2px 1px currentColor; }
    50%  { opacity: 1;   transform: scale(1.6);  box-shadow: 0 0 8px 4px currentColor; }
    100% { opacity: 0.2; transform: scale(0.8);  box-shadow: 0 0 2px 1px currentColor; }
  }

  /* Rotation d'étoile à 4 branches */
  @keyframes tourner {
    0%   { transform: rotate(0deg)   scale(1);   opacity: 0.6; }
    50%  { transform: rotate(180deg) scale(1.4); opacity: 1;   }
    100% { transform: rotate(360deg) scale(1);   opacity: 0.6; }
  }

  /* Étoile filante */
  @keyframes filer {
    0%   { transform: translateX(0)    translateY(0)    scaleX(1);   opacity: 1; }
    80%  { opacity: 1; }
    100% { transform: translateX(300px) translateY(150px) scaleX(8);  opacity: 0; }
  }

  /* Apparition douce */
  @keyframes apparaitre {
    0%   { opacity: 0; transform: scale(0); }
    50%  { opacity: 1; transform: scale(1.2); }
    100% { opacity: 0; transform: scale(0); }
  }

  /* Forme étoile à 4 branches */
  .etoile-croix {
    position: absolute;
    pointer-events: none;
  }

  .etoile-croix::before,
  .etoile-croix::after {
    content: '';
    position: absolute;
    background: currentColor;
    border-radius: 2px;
  }

  .etoile-croix::before {
    width: 100%;
    height: 30%;
    top: 35%;
    left: 0;
  }

  .etoile-croix::after {
    width: 30%;
    height: 100%;
    top: 0;
    left: 35%;
  }
`;
document.head.appendChild(styleEtoiles);


// ---- Couleurs selon le thème ----



// ---- Données de toutes les étoiles ----
const listeEtoiles = [];


// ============================================================
// TYPE 1 — Petits points scintillants (50 étoiles)
// ============================================================
for (let i = 0; i < 50; i++) {

  const el = document.createElement('div');

  const x       = Math.random() * 100;
  const y       = Math.random() * 100;
  const taille  = Math.random() * 3 + 1;
  const duree   = Math.random() * 4 + 2;
  const delai   = Math.random() * 6;

  el.style.cssText = `
    position: absolute;
    left: ${x}%;
    top: ${y}%;
    width: ${taille}px;
    height: ${taille}px;
    border-radius: 50%;
    background-color: ${getCouleurEtoile()};
    animation: scintiller ${duree}s ${delai}s infinite ease-in-out;
  `;

  conteneurEtoiles.appendChild(el);

  listeEtoiles.push({
    element: el,
    x, y,
    vx: (Math.random() - 0.5) * 0.015,
    vy: (Math.random() - 0.5) * 0.015,
    type: 'point'
  });
}


// ============================================================
// TYPE 2 — Étoiles pulsantes avec halo (20 étoiles)
// ============================================================
for (let i = 0; i < 20; i++) {

  const el = document.createElement('div');

  const x      = Math.random() * 100;
  const y      = Math.random() * 100;
  const taille = Math.random() * 1.5 + 0.5;
  const duree  = Math.random() * 3 + 2;
  const delai  = Math.random() * 5;
  const couleur = getCouleurEtoile();

  el.style.cssText = `
    position: absolute;
    left: ${x}%;
    top: ${y}%;
    width: ${taille}px;
    height: ${taille}px;
    border-radius: 50%;
    background-color: ${couleur};
    color: ${couleur};
    animation: pulser ${duree}s ${delai}s infinite ease-in-out;
  `;

  conteneurEtoiles.appendChild(el);

  listeEtoiles.push({
    element: el,
    x, y,
    vx: (Math.random() - 0.5) * 0.01,
    vy: (Math.random() - 0.5) * 0.01,
    type: 'halo'
  });
}


// ============================================================
// TYPE 3 — Étoiles à 4 branches qui tournent (15 étoiles)
// ============================================================
for (let i = 0; i < 15; i++) {

  const el = document.createElement('div');
  el.className = 'etoile-croix';

  const x      = Math.random() * 100;
  const y      = Math.random() * 100;
  const taille = Math.random() * 12 + 8;
  const duree  = Math.random() * 5 + 3;
  const delai  = Math.random() * 4;
  const couleur = getCouleurEtoile();

  el.style.cssText = `
    left: ${x}%;
    top: ${y}%;
    width: ${taille}px;
    height: ${taille}px;
    color: ${couleur};
    animation: tourner ${duree}s ${delai}s infinite linear;
  `;

  conteneurEtoiles.appendChild(el);

  listeEtoiles.push({
    element: el,
    x, y,
    vx: (Math.random() - 0.5) * 0.008,
    vy: (Math.random() - 0.5) * 0.008,
    type: 'croix'
  });
}


// ============================================================
// TYPE 4 — Étoiles filantes (générées périodiquement)
// ============================================================
function creerEtoileFilante() {

  const el = document.createElement('div');

  // Départ aléatoire sur le bord gauche ou en haut
  const x = Math.random() * 60;
  const y = Math.random() * 40;

  const longueur = Math.random() * 80 + 40;
  const duree    = Math.random() * 1.5 + 0.8;
  const couleur  = getCouleurEtoile();

  el.style.cssText = `
    position: absolute;
    left: ${x}%;
    top: ${y}%;
    width: ${longueur}px;
    height: 2px;
    background: linear-gradient(90deg, transparent, ${couleur});
    border-radius: 2px;
    transform-origin: left center;
    transform: rotate(${Math.random() * 30 + 15}deg);
    animation: filer ${duree}s ease-out forwards;
  `;

  conteneurEtoiles.appendChild(el);

  // On supprime l'étoile filante après son animation
  setTimeout(function() {
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }, duree * 1000 + 100);
}

// On crée une étoile filante toutes les 2 à 5 secondes
function lancerEtoilesFilantes() {
  creerEtoileFilante();
  const prochaine = Math.random() * 3000 + 2000;
  setTimeout(lancerEtoilesFilantes, prochaine);
}
lancerEtoilesFilantes();


// ============================================================
// TYPE 5 — Particules qui apparaissent et disparaissent (20)
// ============================================================
for (let i = 0; i < 20; i++) {

  const el = document.createElement('div');

  const x      = Math.random() * 100;
  const y      = Math.random() * 100;
  const taille = Math.random() * 5 + 2;
  const duree  = Math.random() * 3 + 2;
  const delai  = Math.random() * 8;

  el.style.cssText = `
    position: absolute;
    left: ${x}%;
    top: ${y}%;
    width: ${taille}px;
    height: ${taille}px;
    border-radius: 50%;
    background-color: ${getCouleurEtoile()};
    animation: apparaitre ${duree}s ${delai}s infinite ease-in-out;
  `;

  conteneurEtoiles.appendChild(el);

  listeEtoiles.push({
    element: el,
    x, y,
    vx: 0,
    vy: 0,
    type: 'particule'
  });
}


// ============================================================
// ANIMATION DE DÉPLACEMENT — requestAnimationFrame
// ============================================================
function animerEtoiles() {

  listeEtoiles.forEach(function(etoile) {

    // Déplacement lent
    etoile.x += etoile.vx;
    etoile.y += etoile.vy;

    // Rebond sur les bords
    if (etoile.x > 100) etoile.x = 0;
    if (etoile.x < 0)   etoile.x = 100;
    if (etoile.y > 100) etoile.y = 0;
    if (etoile.y < 0)   etoile.y = 100;

    etoile.element.style.left = etoile.x + '%';
    etoile.element.style.top  = etoile.y + '%';
  });

  requestAnimationFrame(animerEtoiles);
}

animerEtoiles();


// ============================================================
// ADAPTATION AU CHANGEMENT DE THÈME
// ============================================================
// ---- Couleurs selon le thème ----
function getCouleurEtoile() {
  const isDark = document.body.classList.contains('dark-mode');

  // Light mode : tons dorés et gris très doux
  const couleursLight = [
    'rgba(245, 166, 35, 0.25)',   // orange doux
    'rgba(245, 166, 35, 0.15)',   // orange très discret
    'rgba(180, 150, 80, 0.2)',    // doré discret
    'rgba(200, 180, 120, 0.2)',   // beige doré
    'rgba(150, 130, 80, 0.15)',   // brun doré
  ];

  // Dark mode : couleurs vives
  const couleursDark = [
    '#F5A623',
    '#FFD580',
    '#E94560',
    '#FFFFFF',
    '#A0C4FF',
  ];

  const palette = isDark ? couleursDark : couleursLight;
  return palette[Math.floor(Math.random() * palette.length)];
}


// ---- Adaptation au changement de thème ----
function adapterCouleursEtoiles() {

  const isDark = document.body.classList.contains('dark-mode');

  // Couleurs light mode
  const couleursLight = [
    'rgba(245, 166, 35, 0.25)',
    'rgba(245, 166, 35, 0.15)',
    'rgba(180, 150, 80, 0.2)',
    'rgba(200, 180, 120, 0.2)',
    'rgba(150, 130, 80, 0.15)',
  ];

  // Couleurs dark mode
  const couleursDark = [
    '#F5A623',
    '#FFD580',
    '#E94560',
    '#FFFFFF',
    '#A0C4FF',
  ];

  listeEtoiles.forEach(function(etoile) {

    const palette = isDark ? couleursDark : couleursLight;
    const nouvelleCouleur = palette[Math.floor(Math.random() * palette.length)];

    if (etoile.type === 'croix') {
      etoile.element.style.color = nouvelleCouleur;
    } else {
      etoile.element.style.backgroundColor = nouvelleCouleur;
    }
  });

  // Étoiles filantes : visibles dans les deux modes
  // mais plus discrètes en light mode
  conteneurEtoiles.style.opacity = isDark ? '1' : '0.6';
}

// On détecte le changement de thème
const observateurTheme = new MutationObserver(adapterCouleursEtoiles);
observateurTheme.observe(document.body, {
  attributes: true,
  attributeFilter: ['class']
});

// Appel initial
adapterCouleursEtoiles();