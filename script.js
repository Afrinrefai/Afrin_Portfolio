const text = "Hey!, I'm Afrin";
let i = 0;

function type() {
    document.getElementById("text").textContent += text.charAt(i);
    i++;
    if (i < text.length) {
        setTimeout(type, 100); // typing speed
    }
}

window.onload = type;

// Animation for skills section

       // Generate stars
        const starsContainer = document.getElementById('stars');
        for (let i = 0; i < 200; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.width = Math.random() * 3 + 'px';
            star.style.height = star.style.width;
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            starsContainer.appendChild(star);
        }

        const skills = [
            // Frontend cluster (top-left to center)
            { name: 'HTML', category: 'frontend', x: 15, y: 20, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', connections: ['CSS', 'JS'] },
            { name: 'CSS', category: 'frontend', x: 25, y: 35, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', connections: ['HTML', 'BOOTSTRAP', 'JS'] },
            { name: 'BOOTSTRAP', category: 'frontend', x: 35, y: 25, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', connections: ['CSS', 'JS'] },
            { name: 'JS', category: 'frontend', x: 45, y: 40, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', connections: ['HTML', 'CSS', 'REACT'] },
            { name: 'REACT', category: 'frontend', x: 55, y: 30, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', connections: ['JS'] },
            
            // Backend cluster (top-right)
            { name: 'PYTHON', category: 'backend', x: 75, y: 25, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', connections: ['SQL'] },
            { name: 'SQL', category: 'backend', x: 85, y: 35, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', connections: ['PYTHON', 'POWER BI', 'LOOKER'] },
            
            // Design cluster (bottom-left)
            { name: 'FIGMA', category: 'design', x: 20, y: 65, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', connections: ['PHOTOSHOP', 'ILLUSTRATOR'] },
            { name: 'PHOTOSHOP', category: 'design', x: 30, y: 75, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg', connections: ['FIGMA', 'ILLUSTRATOR'] },
            { name: 'ILLUSTRATOR', category: 'design', x: 15, y: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg', connections: ['FIGMA', 'PHOTOSHOP'] },
            
            // Data & CMS cluster (bottom-right)
            { name: 'WORDPRESS', category: 'data', x: 70, y: 70, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg', connections: ['HTML', 'CSS'] },
            { name: 'POWER BI', category: 'data', x: 80, y: 65, icon: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg', connections: ['SQL', 'LOOKER'] },
            { name: 'LOOKER', category: 'data', x: 85, y: 78, icon: 'https://cdn.worldvectorlogo.com/logos/looker-1.svg', connections: ['SQL', 'POWER BI'] }
        ];

        const constellation = document.getElementById('constellation');
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        // Set canvas size
        function resizeCanvas() {
            canvas.width = constellation.offsetWidth;
            canvas.height = constellation.offsetHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Create skill nodes
        const nodes = {};
        skills.forEach(skill => {
            const node = document.createElement('div');
            node.className = `skill-node ${skill.category}`;
            node.style.left = skill.x + '%';
            node.style.top = skill.y + '%';
            
            const icon = document.createElement('div');
            icon.className = 'skill-icon';
            icon.innerHTML = `<img src="${skill.icon}" alt="${skill.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%2250%22 font-size=%2250%22>⚙️</text></svg>'">`;
            
            const name = document.createElement('div');
            name.className = 'skill-name';
            name.textContent = skill.name;
            
            node.appendChild(icon);
            node.appendChild(name);
            constellation.appendChild(node);
            
            nodes[skill.name] = {
                element: node,
                skill: skill,
                x: 0,
                y: 0
            };
            
            // Add hover events
            node.addEventListener('mouseenter', () => highlightConnections(skill.name));
            node.addEventListener('mouseleave', () => clearHighlights());
        });

        // Calculate node positions
        function updateNodePositions() {
            Object.keys(nodes).forEach(name => {
                const rect = nodes[name].element.getBoundingClientRect();
                const containerRect = constellation.getBoundingClientRect();
                nodes[name].x = rect.left - containerRect.left + rect.width / 2;
                nodes[name].y = rect.top - containerRect.top + rect.height / 2;
            });
        }

        // Draw connections
        function drawConnections(highlighted = null) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            skills.forEach(skill => {
                const from = nodes[skill.name];
                
                skill.connections.forEach(toName => {
                    const to = nodes[toName];
                    if (!to) return;
                    
                    const isHighlighted = highlighted && 
                        (highlighted === skill.name || highlighted === toName);
                    
                    ctx.beginPath();
                    ctx.moveTo(from.x, from.y);
                    ctx.lineTo(to.x, to.y);
                    
                    if (isHighlighted) {
                        const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
                        const color = getComputedStyle(from.element).color;
                        gradient.addColorStop(0, color);
                        gradient.addColorStop(1, getComputedStyle(to.element).color);
                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = 3;
                        ctx.shadowBlur = 15;
                        ctx.shadowColor = color;
                    } else {
                        ctx.strokeStyle = 'rgba(102, 126, 234, 0.2)';
                        ctx.lineWidth = 1;
                        ctx.shadowBlur = 0;
                    }
                    
                    ctx.stroke();
                });
            });
        }

        function highlightConnections(skillName) {
            const skill = skills.find(s => s.name === skillName);
            
            Object.values(nodes).forEach(node => {
                node.element.classList.remove('active');
            });
            
            nodes[skillName].element.classList.add('active');
            skill.connections.forEach(connName => {
                if (nodes[connName]) {
                    nodes[connName].element.classList.add('active');
                }
            });
            
            drawConnections(skillName);
        }

        function clearHighlights() {
            Object.values(nodes).forEach(node => {
                node.element.classList.remove('active');
            });
            drawConnections();
        }

        // Initialize
        setTimeout(() => {
            updateNodePositions();
            drawConnections();
        }, 100);

        window.addEventListener('resize', () => {
            updateNodePositions();
            drawConnections();
        });

        // Animate connections
        let animationFrame = 0;
        function animate() {
            animationFrame++;
            if (animationFrame % 60 === 0) {
                updateNodePositions();
                drawConnections();
            }
            requestAnimationFrame(animate);
        }
        animate();