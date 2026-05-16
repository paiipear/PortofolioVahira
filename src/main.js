    // Portfolio Data
        const GITHUB_USERNAME = "paiipear";

        const MODELS_3D = [
            { name: "Dispenser Model", type: "Simple 3D", image: "/images/dispenser.png" },
            { name: "Stove Model", type: "Simple 3D", image: "/images/kompor.png" },
            { name: "Cash Register Model", type: "Simple 3D", image: "/images/mesinKasir.png" },
            { name: "Table and Chairs Model", type: "Simple 3D", image: "/images/MejadanKursi.png" },
            { name: "Tteokbokki Model", type: "Simple 3D", image: "/images/teok.png" },
            { name: "Ice Tea Model", type: "Simple 3D", image: "/images/esteh.png" },
            { name: "Cabinet Table Model", type: "Simple 3D", image: "/images/lemari.png" },
            { name: "3D Tteokbokki Booth Model", type: "Simple 3D", image: "/images/toko.png" },
        ];

        const CERTIFICATES = [
            { title: "Dicoding AWS", desc: "Pelajari dasar-dasar cloud dan AI generatif di AWS", image: "/images/sertifdicoding.png" },
            { title: "Training", desc: "Optimasi Media Sosial DEA DTS 2025", image: "/images/VAHIRA_NURFITRIA_digitalentSertif_Social_Oportu.png" },
            { title: "Generative AI Workshop", desc: "AI Generatif yang Bertanggung Jawab di SMK Negeri 1 Depok", image: "/images/generativeai.jpeg" },
            { title: "Build With AI Event", desc: "Memberdayakan inovasi melalui pengalaman AI langsung", image: "/images/buildwithai.jpeg" },
        ];

        let repos = [];

        // Initialize Function
        function init() {
            console.log("Initializing Portfolio...");
            
            // Portfolio Filtering
            const filterButtons = document.querySelectorAll('.filter-btn');
            if (filterButtons.length > 0) {
                filterButtons.forEach(btn => {
                    btn.addEventListener('click', () => {
                        const filter = btn.dataset.filter;
                        
                        // Update active state
                        filterButtons.forEach(b => {
                            b.classList.remove('active');
                            b.classList.add('inactive');
                        });
                        btn.classList.add('active');
                        btn.classList.remove('inactive');

                        renderPortfolio(filter);
                    });
                });
            }

            // Login Modal
            const loginModal = document.getElementById('loginModal');
            const openLogin = document.getElementById('openLogin');
            const closeLogin = document.getElementById('closeLogin');

            if (openLogin && loginModal) {
                openLogin.addEventListener('click', (e) => {
                    e.preventDefault();
                    loginModal.style.display = 'flex';
                });
            }

            if (closeLogin && loginModal) {
                closeLogin.addEventListener('click', (e) => {
                    e.preventDefault();
                    loginModal.style.display = 'none';
                });

                // Close modal on background click
                loginModal.addEventListener('click', (e) => {
                    if (e.target === loginModal) {
                        loginModal.style.display = 'none';
                    }
                });
            }

            // Copy Email Functionality
            const copyBtn = document.getElementById('copyEmail');
            const tooltip = document.getElementById('copyTooltip');
            const email = "vahira.nurfitriaa@gmail.com";

            if (copyBtn) {
                copyBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (navigator.clipboard) {
                        navigator.clipboard.writeText(email).then(() => {
                            showTooltip(tooltip);
                        }).catch(err => {
                            console.error('Gagal menyalin: ', err);
                        });
                    }
                });
            }

            // Smooth Scroll Reveal
            try {
                const observerOptions = {
                    threshold: 0.1
                };

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('reveal-visible');
                            entry.target.classList.remove('reveal');
                        }
                    });
                }, observerOptions);

                document.querySelectorAll('section').forEach(section => {
                    section.classList.add('reveal');
                    observer.observe(section);
                });
            } catch (e) {
                console.error("Observer failure:", e);
            }

            // Fetch GitHub Data
            fetchRepos();
        }

        // Run init when page loads
        document.addEventListener('DOMContentLoaded', init);

        function showTooltip(tooltip) {
            if (tooltip) {
                tooltip.classList.remove('opacity-0');
                tooltip.classList.add('opacity-100');
                
                setTimeout(() => {
                    tooltip.classList.remove('opacity-100');
                    tooltip.classList.add('opacity-0');
                }, 2000);
            }
        }

        async function fetchRepos() {
            try {
                const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
                if (!response.ok) throw new Error('Gagal mengambil data repository');
                repos = await response.json();
                renderPortfolio('website');
            } catch (err) {
                console.error("Fetch error:", err);
                // Fallback dummy data if GitHub fails
                repos = [
                    { name: "Portofolio-Vite", html_url: "https://github.com/paiipear", description: "Personal portfolio website built with modern technologies.", stargazers_count: 5, language: "JavaScript" },
                    { name: "E-Commerce-App", html_url: "https://github.com/paiipear", description: "A full-stack e-commerce platform with secure payment integration.", stargazers_count: 12, language: "PHP" },
                    { name: "Management-System", html_url: "https://github.com/paiipear", description: "Internal management tool for digital support optimization.", stargazers_count: 3, language: "Java" }
                ];
                renderPortfolio('website');
            }
        }

        function renderPortfolio(filter) {
            const grid = document.getElementById('portfolio-grid');
            if (!grid) return;
            
            grid.style.opacity = 0;
            
            setTimeout(() => {
                grid.innerHTML = '';
                
                if (filter === 'website') {
                    grid.className = "grid grid-website gap-10";
                    repos.forEach(repo => {
                        grid.innerHTML += `
                            <div class="project-card group">
                                <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                                    <div style="display: flex; justify-content: space-between; align-items: start;">
                                        <div style="color: rgba(191, 161, 129, 0.4);"><i class="fab fa-github" style="font-size: 32px;"></i></div>
                                        <a href="${repo.html_url}" target="_blank" style="padding: 0.5rem; color: rgba(226, 226, 226, 0.4); text-decoration: none; transition: color 0.3s;">
                                            <i class="fas fa-external-link-alt" style="font-size: 20px;"></i>
                                        </a>
                                    </div>
                                    <h3 style="font-size: 1.5rem; font-family: var(--font-display); font-style: italic; color: var(--color-secondary); transition: color 0.3s;">${repo.name}</h3>
                                    <p style="color: var(--color-secondary); font-size: 0.875rem; font-weight: 300; line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                                        ${repo.description || "Proyek website yang dibangun dengan keahlian dan perhatian pada detail."}
                                    </p>
                                </div>
                                <div style="margin-top: 3rem; display: flex; justify-content: space-between; align-items: center; font-size: 10px; font-style: italic; color: rgba(226, 226, 226, 0.4);">
                                    <span style="color: rgba(191, 161, 129, 0.6);">${repo.language || "Native"}</span>
                                    <div style="display: flex; gap: 1rem;">
                                        <span style="display: flex; align-items: center; gap: 0.25rem;"><i class="fas fa-star" style="font-size: 12px;"></i> ${repo.stargazers_count}</span>
                                    </div>
                                </div>
                            </div>
                        `;
                    });
                } else if (filter === 'design') {
                    grid.className = "grid grid-design gap-10";
                    MODELS_3D.forEach(model => {
                        grid.innerHTML += `
                            <div class="group" style="overflow: hidden; background: rgba(28, 31, 38, 0.2); border: 1px solid rgba(226, 226, 226, 0.1); border-radius: 2rem; transition: all 0.3s; display: flex; flex-direction: column; align-items: center;">
                                <div style="width: 100%; aspect-ratio: 1/1; padding: 1.5rem; display: flex; align-items: center; justify-content: center; background: rgba(191, 161, 129, 0.02);">
                                    <img 
                                        src="${model.image}" 
                                        alt="${model.name}" 
                                        style="max-width: 100%; max-height: 100%; object-fit: contain; filter: grayscale(1); opacity: 0.6; transition: all 0.5s; transform: scale(0.9);"
                                        onmouseover="this.style.filter='grayscale(0)'; this.style.opacity='1'; this.style.transform='scale(1)'"
                                        onmouseout="this.style.filter='grayscale(1)'; this.style.opacity='0.6'; this.style.transform='scale(0.9)'"
                                    />
                                </div>
                                <div style="padding: 1.5rem; text-align: center; width: 100%; background: rgba(28, 31, 38, 0.4); border-top: 1px solid rgba(226, 226, 226, 0.1);">
                                    <h5 style="font-size: 0.75rem; font-weight: bold; color: var(--color-secondary); text-transform: uppercase; margin-bottom: 0.25rem; letter-spacing: -0.025em;">${model.name}</h5>
                                    <span style="font-size: 9px; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(191, 161, 129, 0.6);">${model.type === "Simple 3D" ? "3D Sederhana" : model.type}</span>
                                </div>
                            </div>
                        `;
                    });
                } else if (filter === 'certificates') {
                    grid.className = "grid grid-certificates gap-10";
                    CERTIFICATES.forEach(cert => {
                        grid.innerHTML += `
                            <div class="group" style="display: flex; flex-direction: column; gap: 2rem; padding: 2rem; background: rgba(28, 31, 38, 0.2); border: 1px solid rgba(226, 226, 226, 0.1); border-radius: 3rem; transition: all 0.3s;">
                                <div style="width: 100%; height: 12rem; flex-shrink: 0; background: rgba(191, 161, 129, 0.05); border-radius: 1rem; overflow: hidden; border: 1px solid rgba(226, 226, 226, 0.1);">
                                    <img 
                                        src="${cert.image}" 
                                        alt="${cert.title}" 
                                        style="width: 100%; height: 100%; object-fit: cover; filter: grayscale(1); opacity: 0.6; transition: all 0.7s;"
                                        onmouseover="this.style.filter='grayscale(0)'; this.style.opacity='1'"
                                        onmouseout="this.style.filter='grayscale(1)'; this.style.opacity='0.6'"
                                    />
                                </div>
                                <div style="display: flex; flex-direction: column; justify-content: center; gap: 0.75rem; text-align: left;">
                                    <div style="color: rgba(191, 161, 129, 0.6); font-size: 9px; text-transform: uppercase; letter-spacing: 0.3em; font-weight: bold;">Pencapaian</div>
                                    <h4 style="font-size: 1.5rem; font-family: var(--font-display); font-style: italic; color: var(--color-secondary); line-height: 1.2;">${cert.title}</h4>
                                    <p style="font-size: 0.875rem; color: var(--color-secondary); font-weight: 300; line-height: 1.6;">${cert.desc}</p>
                                </div>
                            </div>
                        `;
                    });
                }
                
                grid.style.opacity = 1;
                grid.style.transition = "opacity 0.3s ease";
            }, 200);
        }