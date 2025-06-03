// Funções e eventos para o modal de comentários de clientes

document.addEventListener('DOMContentLoaded', function() {
    // Elementos principais do modal
    const modal = document.getElementById('modal-customer-comments');
    const closeBtn = document.getElementById('close-modal-btn');
    const seeMoreBtn = document.getElementById('see-more-comments-btn');
    const commentsList = document.getElementById('comments-list');

    // Lista de comentários mockados
    const comments = [
        {
            id: 1,
            avatar: "imagens/Marco.jpg",
            name: "Marco Chuveiros",
            service: "Banho & Tosa",
            date: "12/04/2025",
            rating: 5,
            text: "Atendimento excelente! Meu cachorro adorou o banho e a tosa ficou perfeita.",
            media: [
                "imagens/Marco_Ladeira.mp4"
            ]
        },
        {
            id: 2,
            avatar: "imagens/Sabrina.jpg",
            name: "Sabrina Carpinteira",
            service: "Consulta Veterinária",
            date: "28/03/2025",
            rating: 4,
            text: "Veterinários muito atenciosos. Minha gata foi muito bem cuidada durante a consulta.",
            media: [
                "imagens/Gata da Sabrina.jpg"
            ]
        },
        {
            id: 3,
            avatar: "imagens/Chico.webp",
            name: "Chico Moedas",
            service: "Adestramento",
            date: "05/04/2025",
            rating: 4,
            text: "Preço justo e serviço de qualidade. O adestramento já está mostrando resultados!",
            media: []
        },
        // Novo comentário: Karen
        {
            id: 4,
            avatar: "imagens/Karen Karate Judo Sumo Samurai",
            name: "Karen Karate Judo Sumo Samurai",
            service: "Banho & Tosa",
            date: "19/05/2025",
            rating: 4,
            text: "Minha cachorra ficou linda após o banho e tosa! Atendimento carinhoso e ambiente limpo. Recomendo muito!",
            media: [
                "imagens/Azul1.jpeg"
            ]
        },
        // Novo comentário: Bia
        {
            id: 5,
            avatar: "imagens/Bia Nissan Honda Mitsubishi Subaru",
            name: "Bia Nissan Honda Mitsubishi Subaru",
            service: "Consulta Veterinária",
            date: "18/05/2025",
            rating: 4,
            text: "Levei minha cachorra para consulta e adorei o cuidado da equipe. Ela foi tratada com muito carinho!",
            media: [
                "imagens/Azul2.jpeg"
            ]
        }
    ];

    // Preenche o select de tipos de serviço no filtro
    function fillServiceTypes() {
        const serviceTypeSelect = document.getElementById('serviceType');
        // Opções fixas, iguais à seção principal
        const services = [
            "Banho",
            "Tosa",
            "Vacinação",
            "Consultas",
            "Adestramento"
        ];
        serviceTypeSelect.innerHTML = '<option value="">Todos os serviços</option>' +
            services.map(s => `<option value="${s}">${s}</option>`).join('');
    }

    // Renderiza a lista de comentários no modal
    function renderComments(list) {
        commentsList.innerHTML = '';
        if (list.length === 0) {
            commentsList.innerHTML = '<div class="text-center text-gray-400 py-10">Nenhum comentário encontrado.</div>';
            return;
        }
        list.forEach(comment => {
            // Gera as estrelas de avaliação
            const stars = Array.from({length: 5}, (_, i) =>
                `<i class="fa-${i < comment.rating ? 'solid' : 'regular'} fa-star ${i < comment.rating ? 'text-[#f7943e]' : 'text-gray-300'}"></i>`
            ).join('');
            // Renderiza imagens e vídeos anexados ao comentário
            const mediaImgs = (comment.media || []).map(url => {
                const ext = url.split('.').pop().toLowerCase();
                if (["mp4","webm","ogg"].includes(ext)) {
                    // Miniatura de vídeo com ícone de play
                    return `
                    <span class="video-thumb-wrapper" style="position:relative;display:inline-block;">
                        <video src="${url}" class="w-14 h-14 object-cover rounded-lg border border-gray-200 shadow-sm cursor-pointer comment-media transition-transform duration-200 hover:scale-105" data-media-url="${url}" data-media-type="video" style="background:#000;display:block;"></video>
                        <span class="play-icon-overlay" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;z-index:2;">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
                                <path d="M7 4L19 12L7 20V4Z" fill="#F0F0F0" fill-opacity="0.95"/>
                            </svg>
                            </span>
                    </span>`;
                } else {
                    // Miniatura de imagem
                    return `<img src="${url}" alt="Pet" class="w-14 h-14 object-cover rounded-lg border border-gray-200 shadow-sm cursor-pointer comment-media transition-transform duration-200 hover:scale-105" data-media-url="${url}" data-media-type="image" />`;
                }
            }).join('');
            commentsList.innerHTML += `
                <div class="comment-card bg-white rounded-xl shadow-md px-6 py-5 flex flex-col gap-y-3 border border-gray-100 transition-shadow duration-200 hover:shadow-xl">
                    <div class="flex items-center gap-x-4">
                        <img src="${comment.avatar}" alt="Avatar" class="w-12 h-12 rounded-full object-cover border-2 border-[#f9fafb]" />
                        <div>
                            <span class="font-semibold text-gray-700 text-lg block">${comment.name}</span>
                            <span class="text-sm text-gray-400">${comment.service ? comment.service + ' • ' : ''}${comment.date}</span>
                        </div>
                        <div class="ml-auto flex items-center gap-x-1 comment-rating">
                            ${stars}
                        </div>
                    </div>
                    <p class="text-gray-700 text-base leading-relaxed">${comment.text}</p>
                    ${mediaImgs ? `<div class="flex gap-x-3 pt-2 comment-media-list">${mediaImgs}</div>` : ''}
                    <button class="util-btn group mt-2 w-full flex items-center justify-center gap-2 px-0 py-2 rounded-full border border-gray-200 bg-white shadow-sm text-gray-700 font-medium text-base transition-all duration-150 hover:bg-[#fff7ed] hover:border-[#f7943e] hover:text-[#f7943e] focus:outline-none focus:ring-2 focus:ring-[#f7943e]"
                        style="min-height:40px; min-width:120px;">
                        <i class="fa-regular fa-thumbs-up group-hover:text-[#f7943e] transition-colors duration-150"></i>
                        <span class="ml-1">Útil</span>
                        <span class="ml-1 useful-count text-[#f7943e] font-semibold">0</span>
                    </button>
                </div>
            `;
        });

        // Adiciona evento de clique para ampliar mídia
        commentsList.querySelectorAll('.comment-media').forEach(el => {
            el.addEventListener('click', function(e) {
                e.stopPropagation();
                abrirOverlayMedia(this);
            });
        });
    }

    // Abre o modal de comentários
    function openModal() {
        // Salva o scroll atual
        const scrollY = window.scrollY || window.pageYOffset;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
        // Compensa a largura da scrollbar
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.paddingRight = scrollBarWidth > 0 ? scrollBarWidth + 'px' : '';
        modal.style.opacity = '0';
        modal.classList.remove('hidden');
        modal.classList.add('flex', 'active');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('role', 'dialog');
        fillServiceTypes();
        // Limpa seleção das patinhas ao abrir o modal
        document.querySelectorAll('#filter-rating .paw-icon').forEach(btn => btn.classList.remove('selected', 'paw-colored'));
        renderComments(comments); // garante que os comentários aparecem ao abrir
        setTimeout(() => {
            modal.style.transition = 'opacity 0.2s';
            modal.style.opacity = '1';
        }, 10);
        setTimeout(() => {
            const firstInput = modal.querySelector('#comments-filter-form input, #comments-filter-form select, #comments-filter-form textarea');
            if (firstInput) firstInput.focus();
        }, 300);
    }

    // Fecha o modal de comentários
    function closeModal() {
        // Restaura o scroll
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        if (scrollY) window.scrollTo(0, -parseInt(scrollY || '0'));
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.classList.remove('flex', 'active');
            modal.classList.add('hidden');
        }, 200);
    }

    // Eventos de abertura e fechamento do modal
    seeMoreBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    // Fecha o modal ao clicar fora do conteúdo
    modal.addEventListener('click', function(event) {
        if (event.target === modal) closeModal();
    });

    // Fecha o modal com ESC, exceto se campo obrigatório estiver vazio
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape") {
            const requiredInput = modal.querySelector('input[required]');
            if (requiredInput && !requiredInput.value) {
                modal.classList.add('shake');
                setTimeout(() => modal.classList.remove('shake'), 400);
            } else {
                closeModal();
            }
        }
    });

    // Retorna o rating selecionado nas patinhas do filtro
    function getSelectedRating() {
        const ratingBtns = document.querySelectorAll('#filter-rating .paw-icon');
        let selected = 0;
        ratingBtns.forEach((btn, idx) => {
            if (btn.classList.contains('selected')) selected = idx + 1;
        });
        return selected;
    }

    // Aplica os filtros aos comentários
    function applyFilters() {
        const keyword = document.getElementById('keyword').value.trim().toLowerCase();
        const dateRange = document.getElementById('dateRange').value;
        const serviceType = document.getElementById('serviceType').value;
        const selectedRating = getSelectedRating();
        const mediaAttached = document.getElementById('mediaAttached').checked;

        let filtered = comments.filter(comment => {
            // Palavra-chave
            if (keyword && !(
                (comment.name && comment.name.toLowerCase().includes(keyword)) ||
                (comment.text && comment.text.toLowerCase().includes(keyword)) ||
                (comment.service && comment.service.toLowerCase().includes(keyword))
            )) return false;

            // Data (intervalo)
            if (dateRange) {
                const commentDate = new Date(comment.date.split('/').reverse().join('-'));
                const now = new Date();
                const days = parseInt(dateRange, 10);
                const diff = (now - commentDate) / (1000 * 60 * 60 * 24);
                if (diff > days) return false;
            }

            // Serviço
            if (serviceType && comment.service) {
                if (!comment.service.toLowerCase().includes(serviceType.toLowerCase())) return false;
            }

            // Avaliação
            if (selectedRating && comment.rating !== selectedRating) return false;

            // Mídia
            if (mediaAttached && (!comment.media || comment.media.length === 0)) return false;

            return true;
        });

        renderComments(filtered);
    }

    // Limpa todos os filtros do painel lateral
    function clearFilters() {
        document.getElementById('keyword').value = '';
        document.getElementById('dateRange').value = '';
        document.getElementById('serviceType').value = '';
        document.getElementById('mediaAttached').checked = false;
        // Limpa seleção das patinhas
        document.querySelectorAll('#filter-rating .paw-icon').forEach(btn => btn.classList.remove('selected', 'paw-colored'));
        renderComments(comments);
    }

    // Evento de clique nas patinhas do filtro de avaliação
    const filterRating = document.getElementById('filter-rating');
    if (filterRating) {
        filterRating.addEventListener('click', function(e) {
            const pawIcons = filterRating.querySelectorAll('.paw-icon');
            const paw = e.target.closest('.paw-icon');
            if (!paw) return;
            const idx = Array.from(pawIcons).indexOf(paw);
            const alreadySelected = paw.classList.contains('selected') && (idx + 1 === getSelectedRating());
            pawIcons.forEach((p, i) => {
                if (alreadySelected) {
                    p.classList.remove('selected', 'paw-colored');
                } else {
                    if (i <= idx) {
                        p.classList.add('selected', 'paw-colored');
                    } else {
                        p.classList.remove('selected', 'paw-colored');
                    }
                }
            });
            applyFilters();
        });
    }

    // Previne submit do formulário de filtros (aplica via JS)
    const filterForm = document.getElementById('comments-filter-form');
    if (filterForm) {
        filterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            applyFilters();
        });
    }

    // Botão para limpar filtros
    const clearBtn = document.querySelector('button[type="button"].bg-gray-50');
    if (clearBtn) {
        clearBtn.addEventListener('click', function(e) {
            e.preventDefault();
            clearFilters();
        });
    }

    // Atualiza comentários ao digitar ou selecionar filtros
    if (filterForm) {
        // Para inputs de texto
        filterForm.querySelectorAll('input[type="text"]').forEach(input => {
            input.addEventListener('input', function() {
                applyFilters();
            });
        });
        // Para selects
        filterForm.querySelectorAll('select').forEach(select => {
            select.addEventListener('change', function() {
                applyFilters();
            });
        });
        // Para checkbox
        filterForm.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                applyFilters();
            });
        });
    }

    // Exponibiliza a função de abrir modal globalmente
    window.openCustomerCommentsModal = openModal;
    
// Função para ampliar imagens e vídeos em overlay com cantos arredondados
function abrirOverlayMedia(mediaElement) {
    // Cria o overlay de fundo escuro e desfocado
    const overlay = document.createElement('div');
    overlay.id = 'media-overlay';
    Object.assign(overlay.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '10000',
        backdropFilter: 'blur(5px)',
        opacity: '0',
        transition: 'opacity 0.3s ease'
    });

    // Container principal arredondado para a mídia
    const container = document.createElement('div');
    Object.assign(container.style, {
        position: 'relative',
        background: 'transparent', // O fundo deve ser transparente para ver a mídia
        borderRadius: '32px', // Cantos arredondados do container
        boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
        padding: '0',
        maxWidth: '68vw',
        maxHeight: '76vh',
        width: 'auto', // Ajusta a largura com base na mídia
        height: 'auto', // Ajusta a altura com base na mídia
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden' // Corta o que passar dos cantos arredondados
    });

    // Cria elemento de mídia (imagem ou vídeo)
    let newMedia;
    const mediaUrl = mediaElement.dataset.mediaUrl || mediaElement.src;
    const mediaType = mediaElement.dataset.mediaType || (mediaUrl.split('.').pop().toLowerCase() === 'mp4' ? 'video' : 'image');

    if (mediaType === 'image') {
        // Imagem ampliada
        newMedia = document.createElement('img');
        newMedia.src = mediaUrl;
        newMedia.alt = mediaElement.alt || '';
    } else if (mediaType === 'video') {
        // Vídeo ampliado
        newMedia = document.createElement('video');
        newMedia.src = mediaUrl;
        newMedia.controls = true;
        newMedia.autoplay = true;
        newMedia.loop = true;
        newMedia.muted = true;
    } else {
        console.error("Tipo de mídia não suportado.");
        return;
    }

    Object.assign(newMedia.style, {
        width: 'auto', // Auto para se ajustar à proporção
        height: 'auto', // Auto para se ajustar à proporção
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain', // Importante para manter a proporção e respeitar o container
        borderRadius: '32px', // Garante que a mídia em si tenha os cantos arredondados
        display: 'block',
        background: 'transparent',
        border: 'none',
        margin: '0',
        flexShrink: '0', // Evita que a mídia encolha se o container for menor
    });

    // Botão de fechar (X) no canto superior direito do container
    const closeBtnMedia = document.createElement('button');
    closeBtnMedia.id = 'media-close-button-on-media';
    closeBtnMedia.innerHTML = `
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="18" fill="rgba(30,30,30,0.65)"/>
            <path d="M12 12L24 24M24 12L12 24" stroke="#f3f4f6" stroke-width="2.5" stroke-linecap="round"/>
        </svg>
    `;
    Object.assign(closeBtnMedia.style, {
        position: 'absolute', // Posicionamento absoluto em relação ao container
        top: '10px',
        right: '10px',
        width: '40px', // Aumentei um pouco para melhor interação
        height: '40px', // Aumentei um pouco para melhor interação
        background: 'transparent',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        padding: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.2s, transform 0.2s',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        zIndex: '10001' // Garante que esteja acima de tudo
    });
    closeBtnMedia.onmouseenter = () => { closeBtnMedia.firstElementChild.firstElementChild.setAttribute('fill', 'rgba(30,30,30,0.85)'); closeBtnMedia.style.transform = 'scale(1.1)'; };
    closeBtnMedia.onmouseleave = () => { closeBtnMedia.firstElementChild.firstElementChild.setAttribute('fill', 'rgba(30,30,30,0.65)'); closeBtnMedia.style.transform = 'scale(1)'; };

    // Adiciona a mídia e o botão de fechar ao container
    container.appendChild(newMedia);
    container.appendChild(closeBtnMedia);

    overlay.appendChild(container);
    document.body.appendChild(overlay);

    // Fade-in do overlay
    setTimeout(() => overlay.style.opacity = '1', 10);

    // Eventos para fechar o overlay
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target === closeBtnMedia || closeBtnMedia.contains(e.target)) {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
        }
    });

    // Fecha overlay com ESC
    document.addEventListener('keydown', function escClose(e) {
        if (e.key === 'Escape') {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
            document.removeEventListener('keydown', escClose);
        }
    });
}

// Lógica dos botões "Útil" (like) baseada em API

    // Busca status de curtida e total de likes
    async function fetchLikeStatus(commentId) {
        try {
            const res = await fetch(`/api/likes/${encodeURIComponent(commentId)}`);
            if (!res.ok) throw new Error('Erro ao buscar status de curtida');
            return await res.json(); // { liked: true/false, count: number }
        } catch (e) {
            return { liked: false, count: 0 };
        }
    }

    // Envia like para o comentário
    async function likeComment(commentId) {
        const res = await fetch('/api/likes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ commentId })
        });
        if (!res.ok) throw new Error('Erro ao curtir');
        return await res.json(); // { liked: true, count: number }
    }

    // Remove like do comentário
    async function unlikeComment(commentId) {
        const res = await fetch(`/api/likes/${encodeURIComponent(commentId)}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Erro ao descurtir');
        return await res.json(); // { liked: false, count: number }
    }

    // Atualiza visual do botão "Útil"
    function updateUsefulBtn(btn, liked, count) {
        let countSpan = btn.querySelector('.useful-count');
        if (!countSpan) {
            countSpan = document.createElement('span');
            countSpan.className = 'useful-count';
            btn.appendChild(document.createTextNode(' '));
            btn.appendChild(countSpan);
        }
        countSpan.textContent = count;
        if (liked) {
            btn.classList.add('liked-utile-btn');
            const icon = btn.querySelector('i.fa-thumbs-up');
            if (icon) icon.classList.add('text-[#f7943e]');
        } else {
            btn.classList.remove('liked-utile-btn');
            const icon = btn.querySelector('i.fa-thumbs-up');
            if (icon) icon.classList.remove('text-[#f7943e]');
        }
    }

    // Inicializa botões "Útil" tanto no modal quanto na página principal
    async function initUsefulButtons() {
        // Modal
        document.querySelectorAll('#comments-list .comment-card .util-btn').forEach(async btn => {
            const commentId = getCommentIdFromButton(btn);
            if (!commentId) return;
            const { liked, count } = await fetchLikeStatus(commentId);
            updateUsefulBtn(btn, liked, count);
            btn.onclick = async function() {
                btn.disabled = true;
                try {
                    let current = await fetchLikeStatus(commentId);
                    let result;
                    if (!current.liked) {
                        result = await likeComment(commentId);
                    } else {
                        result = await unlikeComment(commentId);
                    }
                    // Atualiza todos os botões do mesmo comentário (modal e principal)
                    document.querySelectorAll('button').forEach(b => {
                        if (getCommentIdFromButton(b) === commentId) {
                            updateUsefulBtn(b, result.liked, result.count);
                        }
                    });
                } finally {
                    btn.disabled = false;
                }
            };
        });
        // Página principal
        document.querySelectorAll('#reviews .card-hover button').forEach(async btn => {
            if (!btn.textContent.includes('Útil')) return;
            const commentId = getCommentIdFromButton(btn);
            if (!commentId) return;
            const { liked, count } = await fetchLikeStatus(commentId);
            updateUsefulBtn(btn, liked, count);
            btn.onclick = async function() {
                btn.disabled = true;
                try {
                    let current = await fetchLikeStatus(commentId);
                    let result;
                    if (!current.liked) {
                        result = await likeComment(commentId);
                    } else {
                        result = await unlikeComment(commentId);
                    }
                    document.querySelectorAll('button').forEach(b => {
                        if (getCommentIdFromButton(b) === commentId) {
                            updateUsefulBtn(b, result.liked, result.count);
                        }
                    });
                } finally {
                    btn.disabled = false;
                }
            };
        });
    }

    // Após renderizar comentários, inicializa botões "Útil"
    const origRenderComments = renderComments;
    renderComments = function(list) {
        origRenderComments(list);
        initUsefulButtons();
    };

    // Inicializa botões "Útil" ao abrir modal ou carregar página
    seeMoreBtn.addEventListener('click', openModal);
    document.addEventListener('DOMContentLoaded', function() {
        initUsefulButtons();
    });
});
