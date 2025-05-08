    // Menú móvil
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Funciones para los modales
    function openModal(modalId) {
        document.getElementById(modalId).style.display = 'flex';
    }

    function closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }

    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', (event) => {
        if (event.target.className === 'tool-modal') {
            event.target.style.display = 'none';
        }
    });

    // Funcionalidad de flashcards
    let currentCardIndex = 0;
    const flashcards = [
        { front: "¿Cuál es la capital de Francia?", back: "París" },
        { front: "¿Cuántos lados tiene un triángulo?", back: "3" },
        { front: "¿Quién escribió 'Cien años de soledad'?", back: "Gabriel García Márquez" }
    ];

    function flipCard() {
        document.getElementById('flashcard').classList.toggle('flipped');
    }

    function updateFlashcard() {
        const card = flashcards[currentCardIndex];
        document.querySelector('.flashcard-front h3').textContent = card.front;
        document.querySelector('.flashcard-back h3').textContent = card.back;
        document.getElementById('flashcard').classList.remove('flipped');
    }

    function nextCard() {
        if (currentCardIndex < flashcards.length - 1) {
            currentCardIndex++;
            updateFlashcard();
        } else {
            alert("¡Has llegado al final de las flashcards!");
        }
    }

    function prevCard() {
        if (currentCardIndex > 0) {
            currentCardIndex--;
            updateFlashcard();
        } else {
            alert("Esta es la primera flashcard");
        }
    }

    function addNewCard() {
        const front = document.getElementById('newCardFront').value;
        const back = document.getElementById('newCardBack').value;
        
        if (front && back) {
            flashcards.push({ front, back });
            document.getElementById('newCardFront').value = '';
            document.getElementById('newCardBack').value = '';
            currentCardIndex = flashcards.length - 1;
            updateFlashcard();
            alert('Flashcard agregada correctamente!');
        } else {
            alert('Por favor completa ambos campos');
        }
    }

    // Funcionalidad del calendario de exámenes
    function addExam() {
        const subject = document.getElementById('examSubject').value;
        const date = document.getElementById('examDate').value;
        const topics = document.getElementById('examTopics').value;
        const importance = document.getElementById('examImportance').value;
        
        if (subject && date) {
            const examsList = document.getElementById('examsList');
            
            if (examsList.querySelector('p')) {
                examsList.innerHTML = '';
            }
            
            const examDiv = document.createElement('div');
            examDiv.className = 'exam-item';
            examDiv.style.margin = '10px 0';
            examDiv.style.padding = '10px';
            examDiv.style.backgroundColor = '#f5f5f5';
            examDiv.style.borderRadius = '4px';
            
            let importanceColor;
            switch(importance) {
                case 'alta': importanceColor = '#e74c3c'; break;
                case 'media': importanceColor = '#f39c12'; break;
                default: importanceColor = '#2ecc71';
            }
            
            examDiv.innerHTML = `
                <h4 style="margin-bottom: 5px;">${subject}</h4>
                <p><strong>Fecha:</strong> ${formatDate(date)}</p>
                ${topics ? `<p><strong>Temas:</strong> ${topics}</p>` : ''}
                <p><strong>Importancia:</strong> <span style="color: ${importanceColor}">${importance}</span></p>
                <button class="btn" onclick="this.parentElement.remove(); checkEmptyExams();" style="margin-top: 5px; padding: 5px 10px; font-size: 0.8rem;">Eliminar</button>
            `;
            
            examsList.appendChild(examDiv);
            
            // Limpiar formulario
            document.getElementById('examSubject').value = '';
            document.getElementById('examDate').value = '';
            document.getElementById('examTopics').value = '';
            document.getElementById('examImportance').value = 'alta';
        } else {
            alert('Por favor completa al menos la materia y la fecha');
        }
    }

    function checkEmptyExams() {
        const examsList = document.getElementById('examsList');
        if (examsList.children.length === 0) {
            examsList.innerHTML = '<p>No hay exámenes programados aún.</p>';
        }
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    }

    // Funcionalidad del planificador de estudio
    document.getElementById('studyPlannerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const subject = document.getElementById('plannerSubject').value;
        const date = document.getElementById('plannerDate').value;
        const time = document.getElementById('plannerTime').value;
        const duration = document.getElementById('plannerDuration').value;
        const topics = document.getElementById('plannerTopics').value;
        
        const studyPlanList = document.getElementById('studyPlanList');
        
        if (studyPlanList.querySelector('p')) {
            studyPlanList.innerHTML = '';
        }
        
        const sessionDiv = document.createElement('div');
        sessionDiv.className = 'study-session';
        sessionDiv.style.margin = '10px 0';
        sessionDiv.style.padding = '10px';
        sessionDiv.style.backgroundColor = '#f5f5f5';
        sessionDiv.style.borderRadius = '4px';
        
        sessionDiv.innerHTML = `
            <h4 style="margin-bottom: 5px;">${subject}</h4>
            <p><strong>Fecha:</strong> ${formatDate(date)} a las ${time}</p>
            <p><strong>Duración:</strong> ${duration} minutos</p>
            ${topics ? `<p><strong>Temas:</strong> ${topics}</p>` : ''}
            <button class="btn" onclick="this.parentElement.remove(); checkEmptyStudyPlan();" style="margin-top: 5px; padding: 5px 10px; font-size: 0.8rem;">Eliminar</button>
        `;
        
        studyPlanList.appendChild(sessionDiv);
        
        // Limpiar formulario
        this.reset();
    });

    function checkEmptyStudyPlan() {
        const studyPlanList = document.getElementById('studyPlanList');
        if (studyPlanList.children.length === 0) {
            studyPlanList.innerHTML = '<p>No hay sesiones planificadas aún.</p>';
        }
    }

    // Funcionalidad de la calculadora de notas
    function calculateGrade() {
        const currentGrade = parseFloat(document.getElementById('currentGrade').value);
        const desiredGrade = parseFloat(document.getElementById('desiredGrade').value);
        const examWeight = parseFloat(document.getElementById('examWeight').value) / 100;
        
        if (isNaN(currentGrade)) {
            alert('Por favor ingresa tu nota actual');
            return;
        }
        
        if (isNaN(desiredGrade)) {
            alert('Por favor ingresa la nota que deseas alcanzar');
            return;
        }
        
        const requiredGrade = (desiredGrade - (currentGrade * (1 - examWeight))) / examWeight;
        
        let resultText;
        if (requiredGrade > 10) {
            resultText = `Para alcanzar ${desiredGrade} necesitarías ${requiredGrade.toFixed(1)} en el examen, lo cual es imposible (la nota máxima es 10).`;
        } else if (requiredGrade < 0) {
            resultText = `¡Ya tienes suficiente para alcanzar ${desiredGrade}! Incluso con 0 en el examen, tu nota final sería ${(currentGrade * (1 - examWeight)).toFixed(1)}.`;
        } else {
            resultText = `Para alcanzar ${desiredGrade}, necesitas al menos ${requiredGrade.toFixed(1)} en el examen.`;
        }
        
        document.getElementById('gradeResult').textContent = resultText;
    }

    function calculateAverage() {
        const gradeInputs = document.querySelectorAll('.grade-input');
        const weightInputs = document.querySelectorAll('.weight-input');
        
        let totalWeight = 0;
        let weightedSum = 0;
        let allValid = true;
        
        gradeInputs.forEach((input, index) => {
            const grade = parseFloat(input.value);
            const weight = parseFloat(weightInputs[index].value);
            
            if (!isNaN(grade) && !isNaN(weight)) {
                weightedSum += grade * weight;
                totalWeight += weight;
            } else if (input.value !== '' || weightInputs[index].value !== '') {
                allValid = false;
            }
        });
        
        if (!allValid) {
            alert('Por favor ingresa valores numéricos válidos en todos los campos');
            return;
        }
        
        if (totalWeight === 0) {
            alert('Por favor ingresa al menos una nota y su ponderación');
            return;
        }
        
        const average = weightedSum / totalWeight;
        document.getElementById('averageResult').textContent = `Tu promedio ponderado es: ${average.toFixed(1)}`;
    }

    // Funcionalidad de las materias
    function showSubjectContent(subject) {
        // Ocultar todos los contenidos primero
        document.querySelectorAll('.subject-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Mostrar el contenido seleccionado
        document.getElementById(`${subject}-content`).classList.add('active');
        
        // Desplazar la vista al contenido
        document.getElementById(`${subject}-content`).scrollIntoView({ behavior: 'smooth' });
    }

    function hideSubjectContent(subject) {
        document.getElementById(`${subject}-content`).classList.remove('active');
    }

    // Funcionalidad de motivación
    const motivationalQuotes = [
        "El éxito es la suma de pequeños esfuerzos repetidos día tras día. - Robert Collier",
        "No mires el reloj; haz lo que él hace. Sigue adelante. - Sam Levenson",
        "El futuro pertenece a aquellos que creen en la belleza de sus sueños. - Eleanor Roosevelt",
        "La educación es el arma más poderosa que puedes usar para cambiar el mundo. - Nelson Mandela",
        "No es que sea muy inteligente, es que permanezco más tiempo con los problemas. - Albert Einstein",
        "El único lugar donde el éxito viene antes que el trabajo es en el diccionario. - Vidal Sassoon",
        "La disciplina es el puente entre las metas y los logros. - Jim Rohn",
        "No te preocupes por los fracasos, preocúpate por las oportunidades que pierdes cuando ni siquiera lo intentas. - Jack Canfield"
    ];

    function newMotivationalQuote() {
        const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
        document.getElementById('motivationQuote').textContent = motivationalQuotes[randomIndex];
    }

    // Inicializar flashcards
    updateFlashcard();