// --- ETAT DE L'APPLICATION ---
const state = {
    title: "",
    subtitle: "",
    date: "4 décembre 2025",
    newsletterTitle: "Les rendez-vous de la médiathèque...",
    introText: "",
    footerText: "© 2025 Communication Interne - Tous droits réservés",
    unsubscribeLink: "#",
    footerContacts: [
        {
            title: "Médiathèque La source",
            lines: [
                "Place du champ de mars",
                "50000 Saint-Lô",
                "Tél : 02.33.72.52.53",
                "Mail : mediatheque@saint-lo.fr"
            ]
        },
        {
            title: "Bibliothèque Le chat perché",
            lines: [
                "Centre social Mersier,",
                "45 avenue des Tilleuls",
                "50000 Saint-Lô",
                "Tél : 02.33.57.33.35"
            ]
        }
    ],
    items: [
        // BLOC 1 : TITRE
        {
            id: 1, 
            title: "1. Titres Percutants", 
            desc: "Le titre doit être court et incitatif. Évitez les phrases trop longues. Ici, nous utilisons un bloc '2/3' pour laisser de la place au texte. N'hésitez pas à utiliser des verbes d'action.", 
            img: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=600&q=80", 
            link: "#", 
            span: 2, 
            highlight: true, 
            pos: {x: 50, y: 50} 
        },
        // BLOC 2 : IMAGES
        {
            id: 2, 
            title: "2. Belles Images", 
            desc: "Une image vaut 1000 mots. Cliquez sur l'image à droite et glissez pour la recadrer parfaitement !", 
            img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80", 
            link: "#", 
            span: 1, 
            highlight: false, 
            pos: {x: 50, y: 30} 
        },
        // BLOC 3 : DESCRIPTION
        {
            id: 3, 
            title: "3. Textes Courts", 
            desc: "Allez à l'essentiel. Ce bloc '1/3' est idéal pour présenter 3 actualités côte à côte. La description est limitée à 4 lignes pour garder un design propre.", 
            img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80", 
            link: "#", 
            span: 1, 
            highlight: false, 
            pos: {x: 50, y: 50} 
        },
        // BLOC 4 : BOUTONS
        {
            id: 4, 
            title: "4. Appel à l'action", 
            desc: "Le bouton 'Voir +' est crucial. Vérifiez toujours votre lien dans l'éditeur à gauche (champ avec l'icône chaîne).", 
            img: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=600&q=80", 
            link: "https://google.fr", 
            span: 1, 
            highlight: false, 
            pos: {x: 50, y: 50} 
        },
        // BLOC 5 : HIGHLIGHT
        {
            id: 5, 
            title: "5. Mise en Avant", 
            desc: "Cliquez sur l'étoile dans l'éditeur pour activer ce mode. Notez le liseré orange moderne à gauche qui attire l'attention.", 
            img: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=600&q=80", 
            link: "#", 
            span: 1, 
            highlight: true, 
            pos: {x: 50, y: 50} 
        },
        // BLOC 6 : GRANDE IMAGE
        {
            id: 6, 
            title: "6. Grande Largeur", 
            desc: "Utilisez la taille '3/3' pour une image panoramique ou un événement majeur. Cela coupe la monotonie de la lecture et crée une respiration visuelle dans la newsletter.", 
            img: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=600&q=80", 
            link: "#", 
            span: 3, 
            highlight: false, 
            pos: {x: 50, y: 60} 
        },
        // BLOC 7 : COMPATIBILITÉ
        {
            id: 7, 
            title: "7. Mobile First", 
            desc: "Tout ce que vous créez ici s'adapte automatiquement sur mobile. Testez le bouton 'Mobile' en haut pour voir le résultat empilé.", 
            img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80", 
            link: "#", 
            span: 2, 
            highlight: false, 
            pos: {x: 50, y: 40} 
        },
        // BLOC 8 : EXPORT
        {
            id: 8, 
            title: "8. Export Outlook", 
            desc: "Pour finir : cochez 'Figer images' en haut si vos destinataires utilisent Outlook. Cela garantit que vos recadrages seront respectés partout.", 
            img: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=600&q=80", 
            link: "#", 
            span: 1, 
            highlight: true, 
            pos: {x: 50, y: 20} 
        }
    ]
};

let viewMode = 'desktop'; 
let dragTargetId = null; 

const FIXED_HEIGHT = 200;

// --- INITIALISATION ---
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initInputs();
    renderBlocks();
    renderPreview();
    
    // Gestionnaire global pour le drag (mouseup)
    window.addEventListener('mouseup', () => {
        if(dragTargetId !== null) {
            dragTargetId = null;
            document.body.style.cursor = 'default';
        }
    });
    
    // Gestionnaire global pour le drag (mousemove)
    window.addEventListener('mousemove', handleGlobalMouseMove);
});

// --- GESTION INPUTS ---
function initInputs() {
    bindInput('inpDate', 'date');
    bindInput('inpNewsletterTitle', 'newsletterTitle');
    bindInput('inpIntro', 'introText');
    
    // Footer bindings
    bindInput('inpFooter', 'footerText');
    bindInput('inpUnsubscribe', 'unsubscribeLink');
    
    bindInput('inpContact1Title', 'footerContacts.0.title');
    const inpContact1Details = document.getElementById('inpContact1Details');
    if (inpContact1Details) {
        inpContact1Details.value = state.footerContacts[0].lines.join('\n');
        inpContact1Details.addEventListener('input', (e) => {
            state.footerContacts[0].lines = e.target.value.split('\n');
            renderPreview();
        });
    }
    
    bindInput('inpContact2Title', 'footerContacts.1.title');
    const inpContact2Details = document.getElementById('inpContact2Details');
    if (inpContact2Details) {
        inpContact2Details.value = state.footerContacts[1].lines.join('\n');
        inpContact2Details.addEventListener('input', (e) => {
            state.footerContacts[1].lines = e.target.value.split('\n');
            renderPreview();
        });
    }
}

function bindInput(id, key) {
    const el = document.getElementById(id);
    if(!el) return;

    // Handle nested keys
    const keys = key.split('.');
    let value = state;
    for (let i = 0; i < keys.length; i++) {
        if (value === undefined) break;
        value = value[keys[i]];
    }
    el.value = value;

    el.addEventListener('input', (e) => {
        let target = state;
        for (let i = 0; i < keys.length - 1; i++) {
            target = target[keys[i]];
        }
        target[keys[keys.length - 1]] = e.target.value;
        renderPreview(); // Mise à jour live
    });
}

// --- GESTION BLOCS ---
function renderBlocks() {
    const container = document.getElementById('blocksList');
    container.innerHTML = '';

    state.items.forEach((item, idx) => {
        const el = document.createElement('div');
        const isSpecial = item.isSpecial;

        el.className = `bg-white p-4 rounded-xl border ${isSpecial ? 'border-indigo-300 ring-1 ring-indigo-100' : (item.highlight ? 'border-orange-300 ring-1 ring-orange-100' : 'border-gray-200')} shadow-sm transition-all group`;
        
        let controlsHtml;
        if (isSpecial) {
            controlsHtml = `
                <button onclick="moveBlockToTop(${idx})" class="p-1 hover:text-indigo-600" title="Remonter tout en haut"><i data-lucide="chevrons-up" class="w-3 h-3"></i></button>
                <div class="h-3 w-px bg-gray-200 mx-1"></div>
                <button onclick="deleteBlock(${idx})" class="p-1 hover:text-red-500"><i data-lucide="trash-2" class="w-3 h-3"></i></button>
            `;
        } else {
            controlsHtml = `
                <button onclick="toggleHighlight(${idx})" class="p-1 hover:text-orange-500 ${item.highlight ? 'text-orange-500' : ''}" title="Mettre en avant"><i data-lucide="star" class="w-3 h-3"></i></button>
                <div class="h-3 w-px bg-gray-200 mx-1"></div>
                <button onclick="moveBlock(${idx}, -1)" class="p-1 hover:text-indigo-600"><i data-lucide="chevron-up" class="w-3 h-3"></i></button>
                <button onclick="moveBlock(${idx}, 1)" class="p-1 hover:text-indigo-600"><i data-lucide="chevron-down" class="w-3 h-3"></i></button>
                <div class="h-3 w-px bg-gray-200 mx-1"></div>
                <button onclick="deleteBlock(${idx})" class="p-1 hover:text-red-500"><i data-lucide="trash-2" class="w-3 h-3"></i></button>
            `;
        }

        let sizeButtonsHtml = '';
        if (!isSpecial) {
            sizeButtonsHtml = `
                <div class="flex gap-1 mb-2">
                    <button onclick="setSize(${idx}, 1)" class="flex-1 py-1 text-[10px] rounded border ${item.span===1 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-500 hover:bg-gray-50'}">1/3</button>
                    <button onclick="setSize(${idx}, 2)" class="flex-1 py-1 text-[10px] rounded border ${item.span===2 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-500 hover:bg-gray-50'}">2/3</button>
                    <button onclick="setSize(${idx}, 3)" class="flex-1 py-1 text-[10px] rounded border ${item.span===3 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-500 hover:bg-gray-50'}">3/3</button>
                </div>`;
        }
        
        el.innerHTML = `
            <div class="flex justify-between items-center mb-3 border-b border-gray-100 pb-2">
                <div class="flex items-center gap-2">
                    <span class="w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold ${isSpecial ? 'bg-indigo-600 text-white' : (item.highlight ? 'bg-orange-500 text-white' : 'bg-gray-800 text-white')}">${isSpecial ? '<i data-lucide="archive" class="w-3 h-3"></i>' : (idx + 1)}</span>
                    <span class="text-xs font-bold text-gray-500 uppercase truncate w-24">${item.title}</span>
                </div>
                <div class="flex items-center gap-1 text-gray-400">
                    ${controlsHtml}
                </div>
            </div>
            <div class="space-y-2">
                ${sizeButtonsHtml}
                <input type="text" value="${item.title}" oninput="updateItem(${idx}, 'title', this.value)" class="w-full border-b text-sm py-1 outline-none focus:border-blue-500" placeholder="Titre">
                <input type="text" value="${item.img}" oninput="updateItem(${idx}, 'img', this.value)" class="w-full border-b text-xs text-blue-600 font-mono py-1 outline-none focus:border-blue-500" placeholder="URL Image">
                ${isSpecial 
                    ? `<button onclick="toggleButton(${idx})" class="w-full text-xs flex items-center gap-2 justify-center py-1 border border-dashed rounded hover:bg-gray-50 mt-2">
                            <i data-lucide="${item.hasButton ? 'minus-circle' : 'plus-circle'}" class="w-3 h-3"></i> ${item.hasButton ? "Retirer le bouton 'Voir plus'" : "Ajouter un bouton 'Voir plus'"}
                       </button>
                       ${item.hasButton ? `<div class="flex items-center gap-2 border-b py-1">
                            <i data-lucide="link" class="w-3 h-3 text-gray-400"></i>
                            <input type="text" value="${item.link}" oninput="updateItem(${idx}, 'link', this.value)" class="w-full text-xs text-gray-600 outline-none focus:border-blue-500" placeholder="Lien destination">
                        </div>` : ''}`
                    : `<div class="flex items-center gap-2 border-b py-1">
                    <i data-lucide="link" class="w-3 h-3 text-gray-400"></i>
                    <input type="text" value="${item.link}" oninput="updateItem(${idx}, 'link', this.value)" class="w-full text-xs text-gray-600 outline-none focus:border-blue-500" placeholder="Lien destination">
                </div>`}
                <textarea id="block-${idx}-desc" rows="2" oninput="updateItem(${idx}, 'desc', this.value)" class="w-full border rounded p-1.5 text-xs outline-none focus:border-blue-500 placeholder-gray-300" placeholder="Description">${item.desc}</textarea>
                <div class="flex gap-1 mt-1 justify-end">
                    <button onclick="formatText(${idx}, 'b')" class="text-xs font-bold border px-2 py-0.5 rounded hover:bg-gray-50">B</button>
                    <button onclick="formatText(${idx}, 'i')" class="text-xs italic border px-2 py-0.5 rounded hover:bg-gray-50">I</button>
                </div>
            </div>
        `;
        container.appendChild(el);
    });
    lucide.createIcons();
}

// --- ACTIONS LOGIQUES ---
window.addBlock = () => {
    state.items.push({ id: Date.now(), title: "Nouveau", desc: "Description...", img: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=600&q=80", link: "#", span: 1, highlight: false, isSpecial: false, hasButton: true, pos: {x:50, y:50} });
    renderBlocks(); renderPreview();
};

window.formatText = (idx, tag) => {
    const textarea = document.querySelector(`#block-${idx}-desc`);
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    
    if (!selectedText) {
        textarea.focus();
        return;
    };

    const newText = `${text.substring(0, start)}<${tag}>${selectedText}</${tag}>${text.substring(end)}`;
    
    textarea.value = newText;
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
};

window.addSpecialBlock = () => {
    if (state.items.some(item => item.isSpecial)) {
        alert("L'encart 'Retour sur...' existe déjà.");
        return;
    }
    state.items.push({ 
        id: Date.now(), 
        title: "Retour sur...", 
        desc: "Un résumé des événements passés ou des nouvelles importantes.", 
        img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80", 
        link: "#", 
        span: 3, 
        highlight: false, 
        isSpecial: true,
        hasButton: false,
        pos: {x:50, y:50} 
    });
    renderBlocks(); 
    renderPreview();
};

window.deleteBlock = (idx) => {
    state.items.splice(idx, 1);
    renderBlocks(); renderPreview();
};

window.moveBlock = (idx, dir) => {
    if(dir === -1 && idx > 0) [state.items[idx], state.items[idx-1]] = [state.items[idx-1], state.items[idx]];
    if(dir === 1 && idx < state.items.length-1) [state.items[idx], state.items[idx+1]] = [state.items[idx+1], state.items[idx]];
    renderBlocks(); renderPreview();
};

window.moveBlockToTop = (idx) => {
    if (idx > 0) {
        const [item] = state.items.splice(idx, 1);
        state.items.unshift(item);
        renderBlocks();
        renderPreview();
    }
};
window.setSize = (idx, span) => { if(!state.items[idx].isSpecial) { state.items[idx].span = span; renderBlocks(); renderPreview(); } };
window.toggleHighlight = (idx) => { state.items[idx].highlight = !state.items[idx].highlight; renderBlocks(); renderPreview(); };
window.toggleButton = (idx) => {
    state.items[idx].hasButton = !state.items[idx].hasButton;
    renderBlocks();
    renderPreview();
};
window.updateItem = (idx, key, val) => { state.items[idx][key] = val; renderPreview(); };

window.setMode = (mode) => {
    viewMode = mode;
    document.getElementById('btnDesktop').className = mode === 'desktop' ? "p-2 rounded bg-white shadow text-blue-600" : "p-2 rounded text-gray-500 hover:bg-white/50";
    document.getElementById('btnMobile').className = mode === 'mobile' ? "p-2 rounded bg-white shadow text-blue-600" : "p-2 rounded text-gray-500 hover:bg-white/50";
    renderPreview();
}

// --- CALCULS LAYOUT ---
function getItemsWithLayout() {
    const processed = [];
    let currentRowSpan = 0;
    let buffer = [];
    
    state.items.forEach(item => {
        if (currentRowSpan + item.span > 3) {
            if (buffer.length) buffer[buffer.length-1].isLast = true;
            processed.push(...buffer);
            buffer = [];
            currentRowSpan = 0;
        }
        buffer.push({...item, isLast: false});
        currentRowSpan += item.span;
    });
    if (buffer.length) {
        buffer[buffer.length-1].isLast = true;
        processed.push(...buffer);
    }
    return processed;
}

function getWidth(span) { return span === 3 ? 600 : (span === 2 ? 400 : 200); }

// --- RECADRAGE DRAG & DROP ---
window.startDrag = (e, id) => {
    e.preventDefault(); // Empêche le drag "fantôme" de l'image
    dragTargetId = id;
    document.body.style.cursor = 'grabbing';
}

function handleGlobalMouseMove(e) {
    if (dragTargetId === null) return;

    // On trouve l'item
    const idx = state.items.findIndex(i => i.id === dragTargetId);
    if(idx === -1) return;

    // Calcul du delta (vitesse ajustée)
    const factor = 0.4;
    let newX = state.items[idx].pos.x - (e.movementX * factor);
    let newY = state.items[idx].pos.y - (e.movementY * factor);

    // Bornage 0-100
    newX = Math.max(0, Math.min(100, newX));
    newY = Math.max(0, Math.min(100, newY));

    state.items[idx].pos = { x: newX, y: newY };
    
    // Mise à jour optimisée : on ne re-rend que l'image concernée
    const imgEl = document.getElementById(`img-${dragTargetId}`);
    if(imgEl) {
        imgEl.style.objectPosition = `${newX}% ${newY}%`;
    }
}

// --- RENDU PREVIEW (DOM) ---
// On construit le HTML "Email" et on l'injecte dans le div
function renderPreview() {
    const container = document.getElementById('previewContainer');
    document.getElementById('previewDate').textContent = state.date;
    
    // Style conteneur
    if(viewMode === 'mobile') {
        container.style.width = '375px';
        container.style.height = '667px';
        container.className = "bg-white shadow-2xl transition-all duration-500 ease-in-out overflow-y-auto overflow-x-hidden relative rounded-[30px] border-[8px] border-gray-800";
    } else {
        container.style.width = '650px';
        container.style.height = '100%';
        container.className = "bg-white shadow-2xl transition-all duration-500 ease-in-out overflow-y-auto overflow-x-hidden relative rounded-none border-t border-gray-200";
    }

    // Génération du HTML Interne (Identique à l'email final, mais injecté dans le DOM)
    // Note: On ajoute des IDs aux images pour le ciblage du Drag & Drop
    const items = getItemsWithLayout();
    
    let itemsHtml = items.map(item => {
        const w = getWidth(item.span);
        
        // --- STRATEGIE STABILITÉ ---
        // On met une bordure gauche à TOUT LE MONDE.
        // Transparente si pas highlight, Orange si highlight.
        // Comme ça, la largeur dispo (content-box) est identique.
        let borderColor = item.highlight ? '#f29f05' : 'transparent';
        let bgContent = item.highlight ? '#fef5e6' : 'transparent';
        if (item.isSpecial) {
            borderColor = '#9ad2d9'; // Blue for special
            bgContent = '#eef8f9';
        }
        
        // Styles conditionnels
        let wrapperStyle = `display: inline-block; width: ${w}px; vertical-align: top; text-align: center; margin-bottom: 40px; box-sizing: border-box;`;
        
        if (viewMode === 'mobile') {
            wrapperStyle = `display: block; width: 100%; margin-bottom: 40px; padding: 0; box-sizing: border-box;`;
        } else {
            // Séparateur vertical (Gris fin à droite), sauf pour le dernier de la ligne
            if (!item.isLast) wrapperStyle += `border-right: 1px solid #e0e0e0;`;
        }

        // Image interactive
        const imgInteractive = `
            <div style="width: 100%; height: ${FIXED_HEIGHT}px; overflow: hidden; border-radius: 6px; margin-bottom: 24px; cursor: move; position: relative; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);"
                 onmousedown="startDrag(event, ${item.id})"
                 class="group"
                 title="Glissez pour recadrer">
                <img id="img-${item.id}" src="${item.img}" style="width: 100%; height: 100%; object-fit: cover; object-position: ${item.pos.x}% ${item.pos.y}%; display: block; pointer-events: none;">
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none"></div>
            </div>
        `;

        return `
        <div style="${wrapperStyle}">
            <!-- CONTENEUR INTERNE AVEC BORDURE GAUCHE FIXE (4px) -->
            <div style="border-left: 4px solid ${borderColor}; background-color: ${bgContent}; padding: 0 10px; box-sizing: border-box; height: 100%;">
                ${imgInteractive}
                <div style="height: 44px; overflow: hidden; margin-bottom: 12px;">
                    <h3 style="color: #1f2937; font-size: 18px; font-family: 'Atkinson Hyperlegible', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 700; margin: 0; line-height: 22px; text-transform: uppercase; letter-spacing: 0.5px;">${item.title}</h3>
                </div>
                <div style="${item.isSpecial ? 'height: auto; margin-bottom: 24px;' : 'height: 88px; overflow: hidden; margin-bottom: 24px; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical;'}">
                    <p style="color: #4b5563; font-size: 14px; line-height: 22px; margin: 0; font-family: 'Atkinson Hyperlegible', 'Helvetica Neue', Helvetica, Arial, sans-serif; text-align: justify;" id="desc-${item.id}"></p>
                </div>
                ${item.hasButton ? `<a href="${item.link}" style="display: inline-block; background-color: #333; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 50px; font-size: 12px; font-family: 'Atkinson Hyperlegible', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: bold; text-transform: uppercase;">Voir +</a>` : ''}
            </div>
        </div>`;
    }).join('');

    const fullHtml = `
        <div style="background-color: #f6f9fc; width: 100%; min-height: 100%; padding: 40px 0; font-family: 'Atkinson Hyperlegible', 'Helvetica Neue', Helvetica, Arial, sans-serif;">
            <center>
                <div style="width: ${viewMode==='mobile'?'100%':'600px'}; background-color: #ffffff; text-align: center; border-radius: 8px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <div style="background-color: #9ad2d9; padding: 20px 30px;">
                        <table width="100%" cellspacing="0" cellpadding="0">
                            <tr>
                                <td align="left">
                                    <img src="https://zupimages.net/up/24/49/w5j8.png" alt="Logo" width="50">
                                </td>
                                <td align="right">
                                    <span style="background-color: #f29f05; color: #ffffff; padding: 8px 15px; border-radius: 20px; font-size: 12px; font-weight: bold;">${state.date}</span>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <!-- Intro -->
                    <div style="padding: 40px 30px; text-align: left;">
                        <p style="color: #4b5563; font-size: 16px; line-height: 26px; text-align: justify; margin-bottom: 15px;">${state.introText.replace(/\n/g, '<br>')}</p>
                        <h2 style="color: #1f2937; font-size: 22px; margin:0; font-weight: 700;">${state.newsletterTitle}</h2>
                    </div>
                    <!-- Grid -->
                    <div style="padding: 0 0 40px 0; font-size: 0;">
                        ${itemsHtml}
                    </div>
                    <!-- Footer -->
                    <div style="background-color: #f3f4f6; padding: 30px; text-align: left;">
                        <table width="100%" cellspacing="0" cellpadding="0">
                            <tr>
                                <td colspan="2" style="padding-bottom: 20px; border-bottom: 1px solid #e5e7eb; text-align: center;">
                                    <p style="color: #9ca3af; font-size: 12px; margin:0; line-height: 18px;">
                                        ${state.footerText}<br>
                                        <a href="${state.unsubscribeLink}" style="color:#6b7280; text-decoration: underline;">Se désinscrire</a>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td width="50%" valign="top" style="padding: 20px 10px 0 0;">
                                    <h4 style="font-size: 13px; font-weight: bold; margin: 0 0 10px 0; color: #1f2937;">${state.footerContacts[0].title}</h4>
                                    <p style="font-size: 12px; color: #6b7280; line-height: 18px; margin: 0;">
                                        ${state.footerContacts[0].lines.join('<br>')}
                                    </p>
                                </td>
                                <td width="50%" valign="top" style="padding: 20px 0 0 10px;">
                                    <h4 style="font-size: 13px; font-weight: bold; margin: 0 0 10px 0; color: #1f2937;">${state.footerContacts[1].title}</h4>
                                    <p style="font-size: 12px; color: #6b7280; line-height: 18px; margin: 0;">
                                        ${state.footerContacts[1].lines.join('<br>')}
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </center>
        </div>
    `;
    
    container.innerHTML = fullHtml;
    // Now that the container is in the DOM, set the innerHTML for descriptions
    items.forEach(item => {
        const descEl = document.getElementById(`desc-${item.id}`);
        if (descEl) {
            descEl.innerHTML = item.desc.replace(/\n/g, '<br>');
        }
    });
}

// --- EXPORT HTML FINAL ---
async function copyHTML() {
    const btn = document.getElementById('btnCopy');
    const originalText = btn.innerHTML;
    btn.innerHTML = `<i data-lucide="loader" class="w-4 h-4 animate-spin"></i> Génération...`;
    lucide.createIcons();
    
    // 1. Clonage pour figer les images si demandé
    const itemsToExport = JSON.parse(JSON.stringify(getItemsWithLayout()));
    const shouldFreeze = document.getElementById('checkFreeze').checked;

    if (shouldFreeze) {
        // Traitement asynchrone des images via Canvas
        await Promise.all(itemsToExport.map(async (item) => {
            item.img = await processImage(item);
            item.frozen = true;
        }));
    }

    // 2. Génération string
    const html = generateEmailString(itemsToExport);
    
    // 3. Affichage dans le tiroir (Sécurité)
    const textarea = document.getElementById('codeOutput');
    textarea.value = html;
    toggleModal(true);

    // 4. Tentative de copie
    textarea.select();
    try {
        // This is a fallback, the main copy button is in the modal
        document.execCommand('copy');
        btn.innerHTML = `<i data-lucide="check" class="w-4 h-4"></i> Copié !`;
    } catch (err) {
        btn.innerHTML = `<i data-lucide="alert-triangle" class="w-4 h-4"></i> Erreur`;
    }
    
    lucide.createIcons();
    setTimeout(() => btn.innerHTML = originalText, 2000);
}

function toggleModal(show) {
    const modal = document.getElementById('codeModal');
    if (modal) {
        modal.classList.toggle('hidden', !show);
    }
}

function copyFromTextarea() {
    const textarea = document.getElementById('codeOutput');
    textarea.select();
    navigator.clipboard.writeText(textarea.value).then(() => {
        const copyBtn = document.querySelector('#codeModal button:last-child');
        const originalBtnText = copyBtn.innerHTML;
        copyBtn.innerHTML = `<i data-lucide="check-check" class="w-4 h-4"></i> Copié !`;
        lucide.createIcons();
        setTimeout(() => {
            copyBtn.innerHTML = originalBtnText;
        }, 2000);
    }).catch(err => {
        alert("Erreur lors de la copie.");
    });
}

// Helper Canvas pour figer
function processImage(item) {
    return new Promise(resolve => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = item.img;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const w = getWidth(item.span);
            canvas.width = w; 
            canvas.height = FIXED_HEIGHT;
            
            // Calcul savant du ratio cover
            const rSrc = img.width / img.height;
            const rDest = w / FIXED_HEIGHT;
            let sW, sH, sX, sY;
            
            if(rSrc > rDest) { // Image plus large
                sH = img.height; sW = img.height * rDest;
                sX = (img.width - sW) * (item.pos.x / 100); sY = 0;
            } else { // Image plus haute
                sW = img.width; sH = img.width / rDest;
                sX = 0; sY = (img.height - sH) * (item.pos.y / 100);
            }
            ctx.drawImage(img, sX, sY, sW, sH, 0, 0, w, FIXED_HEIGHT);
            resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
        img.onerror = () => resolve(item.img); // Fallback
    });
}

// Template string final (Optimisé Email)
function generateEmailString(items) {
    const rows = items.map(item => {
        const w = getWidth(item.span);
        let borderColor = item.highlight ? '#f29f05' : 'transparent';
        let bgContent = item.highlight ? '#fef5e6' : 'transparent';
        if (item.isSpecial) {
            borderColor = '#9ad2d9';
            bgContent = '#eef8f9';
        }
        const borderRight = (!item.isLast) ? 'border-right: 1px solid #e0e0e0;' : '';
        
        // Si figé, pas de object-position CSS nécessaire
        const imgCss = item.frozen 
            ? `width: 100%; height: ${FIXED_HEIGHT}px; display: block; object-fit: cover; border-radius: 6px;`
            : `width: 100%; height: ${FIXED_HEIGHT}px; display: block; object-fit: cover; object-position: ${item.pos.x}% ${item.pos.y}%; border-radius: 6px;`;

        return `
        <!-- BLOC ${item.title} -->
        <div class="responsive-col" style="display: inline-block; width: ${w}px; vertical-align: top; text-align: center; margin-bottom: 40px; box-sizing: border-box; ${borderRight}">
            <!-- TABLEAU INTERNE POUR BORDURE GAUCHE -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-left: 4px solid ${borderColor}; background-color: ${bgContent};">
                <tr>
                    <td style="padding: 0 10px;">
                        <div style="width: 100%; height: ${FIXED_HEIGHT}px; overflow: hidden; margin-bottom: 24px;">
                            <img src="${item.img}" alt="${item.title}" class="mobile-img" style="${imgCss}">
                        </div>
                        <div style="height: 44px; overflow: hidden; margin-bottom: 12px;">
                            <h3 style="color: #1f2937; font-size: 18px; font-family: 'Atkinson Hyperlegible', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 700; margin: 0; line-height: 22px; text-transform: uppercase; letter-spacing: 0.5px;">${item.title}</h3>
                        </div>
                        <div style="${item.isSpecial ? 'height: auto; margin-bottom: 24px;' : 'height: 88px; overflow: hidden; margin-bottom: 24px;'}">
                            <p class="justify-text" style="color: #4b5563; font-size: 14px; line-height: 22px; margin: 0; font-family: 'Atkinson Hyperlegible', 'Helvetica Neue', Helvetica, Arial, sans-serif; text-align: justify;">${item.desc.replace(/\n/g, '<br>')}</p>
                        </div>
                        ${item.hasButton ? `<a href="${item.link}" style="display: inline-block; background-color: #333; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 50px; font-size: 12px; font-family: 'Atkinson Hyperlegible', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: bold; text-transform: uppercase;">Voir +</a>` : ''}
                    </td>
                </tr>
            </table>
        </div>`;
    }).join('');

    return `<!DOCTYPE html>
<html lang="fr" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>${state.newsletterTitle}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
    <style>
        body { margin: 0; padding: 0; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color: #f6f9fc; font-family: 'Atkinson Hyperlegible', sans-serif; }
        img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        table { border-collapse: collapse !important; }
        .justify-text { text-align: justify; -webkit-hyphens: auto; -ms-hyphens: auto; hyphens: auto; }
        
        @media only screen and (max-width: 600px) {
            .main-container { width: 100% !important; max-width: 100% !important; }
            .responsive-col { width: 100% !important; max-width: 100% !important; display: block !important; margin-bottom: 40px !important; border-right: none !important; padding: 0 !important; }
            .mobile-img { width: 100% !important; height: 200px !important; } 
            .mobile-pad { padding: 20px !important; }
        }
    </style>
</head>
<body style="background-color: #f6f9fc; font-family: 'Atkinson Hyperlegible', 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 40px 0;">
    <center>
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f6f9fc;">
            <tr>
                <td align="center">
                    <table border="0" cellpadding="0" cellspacing="0" width="600" class="main-container" style="background-color: #ffffff; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); border-radius: 8px;">
                        <tr>
                            <td style="background-color: #9ad2d9; padding: 20px 30px;">
                                <table width="100%" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td align="left">
                                            <img src="https://zupimages.net/up/24/49/w5j8.png" alt="Logo" width="50">
                                        </td>
                                        <td align="right" style="font-family: 'Atkinson Hyperlegible', sans-serif;">
                                            <span style="background-color: #f29f05; color: #ffffff; padding: 8px 15px; border-radius: 20px; font-size: 12px; font-weight: bold;">${state.date}</span>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 40px 30px; text-align: left;" class="mobile-pad">
                                <p class="mobile-text justify-text" style="color: #4b5563; font-size: 16px; line-height: 26px; text-align: justify; margin-bottom: 15px;">
                                    ${state.introText.replace(/\n/g, '<br>')}
                                </p>
                                <h2 style="color: #1f2937; font-size: 22px; margin: 0; font-weight: 700;">${state.newsletterTitle}</h2>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="padding: 0 0 40px 0; font-size: 0; text-align: center;">
                                ${rows}
                            </td>
                        </tr>
                        <tr>
                            <td align="left" style="background-color: #f3f4f6; padding: 30px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td align="center" colspan="2" style="padding-bottom: 20px; border-bottom: 1px solid #e5e7eb;">
                                            <p style="color: #9ca3af; font-size: 12px; margin: 0; line-height: 18px;">
                                                ${state.footerText}<br>
                                                <a href="${state.unsubscribeLink}" style="color: #6b7280; text-decoration: underline;">Se désinscrire</a>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="50%" valign="top" style="padding: 20px 10px 0 0; font-family: 'Atkinson Hyperlegible', sans-serif;">
                                            <h4 style="font-size: 13px; font-weight: bold; margin: 0 0 10px 0; color: #1f2937;">${state.footerContacts[0].title}</h4>
                                            <p style="font-size: 12px; color: #6b7280; line-height: 18px; margin: 0;">
                                                ${state.footerContacts[0].lines.join('<br>')}
                                            </p>
                                        </td>
                                        <td width="50%" valign="top" style="padding: 20px 0 0 10px; font-family: 'Atkinson Hyperlegible', sans-serif;">
                                            <h4 style="font-size: 13px; font-weight: bold; margin: 0 0 10px 0; color: #1f2937;">${state.footerContacts[1].title}</h4>
                                            <p style="font-size: 12px; color: #6b7280; line-height: 18px; margin: 0;">
                                                ${state.footerContacts[1].lines.join('<br>')}
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </center>
</body>
</html>`;
}
