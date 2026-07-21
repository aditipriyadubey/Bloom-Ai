from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.db.database import get_session
from app.models.schemas import Student, StudentConceptMastery
from typing import List, Optional

router = APIRouter()

# Core lessons data from the prototype data model
BASE_LESSONS = [
  {
    "id": "l1",
    "title": "Understanding Fractions",
    "concept": "Fractions",
    "subject": "Mathematics",
    "duration": "10 min",
    "order": 1,
    "content": "A fraction represents a part of a whole. Think of it like cutting a pizza into equal slices! 🍕\n\nWhen we write ¾, we mean:\n• The number on top (3) is the **numerator** — it tells us how many parts we have.\n• The number on the bottom (4) is the **denominator** — it tells us the total number of equal parts.\n\n**Real-life examples:**\n• If you eat 2 slices out of 8, you've eaten 2/8 of the pizza\n• If you've completed 3 chapters out of 5, you've done 3/5 of the book\n• Half an hour is 30/60 minutes = 1/2 hour\n\n**Remember:** The denominator can never be zero! You can't divide something into zero parts.\n\nFractions are everywhere around us — from recipes in the kitchen to sharing snacks with friends!",
    "visualExample": "Imagine a chocolate bar divided into 6 equal pieces. If you give 2 pieces to your friend, you gave away 2/6 (or 1/3) of the chocolate.",
    "hints": [
      "Think of fractions as pieces of a whole object",
      "The top number counts the pieces you have",
      "The bottom number tells the total pieces"
    ],
    "practiceQuestions": [
      {
        "id": "l1q1",
        "question": "If a cake is cut into 8 equal pieces and you eat 3, what fraction did you eat?",
        "options": ["3/8", "8/3", "3/5", "5/8"],
        "correctAnswer": 0,
        "hint": "Count how many pieces you ate (numerator) and the total pieces (denominator)",
        "encouragement": "Yummy! You really understand fractions! 🎂",
        "explanation": "You ate 3 pieces out of 8 total, so the fraction is 3/8."
      },
      {
        "id": "l1q2",
        "question": "In the fraction 5/7, what is the denominator?",
        "options": ["5", "7", "12", "2"],
        "correctAnswer": 1,
        "hint": "The denominator is the number at the bottom of the fraction",
        "encouragement": "Great job identifying the denominator! 🌟",
        "explanation": "The denominator (7) is the bottom number — it tells us the whole is divided into 7 parts."
      },
      {
        "id": "l1q3",
        "question": "Which fraction is larger: 1/2 or 1/4?",
        "options": ["1/2", "1/4", "They are equal", "Cannot compare"],
        "correctAnswer": 0,
        "hint": "Think about cutting a pizza — would you rather have half or a quarter?",
        "encouragement": "Excellent thinking! Half is indeed bigger than a quarter! 🍕",
        "explanation": "1/2 means one out of 2 parts, which is bigger than 1 out of 4 parts."
      }
    ]
  },
  {
    "id": "l2",
    "title": "Adding Fractions",
    "concept": "Fractions",
    "subject": "Mathematics",
    "duration": "10 min",
    "order": 2,
    "content": "Now that we know what fractions are, let's learn to add them! 🎯\n\n**Adding fractions with the same denominator is easy:**\nSimply add the numerators and keep the denominator the same.\n\nExample: 2/5 + 1/5 = (2+1)/5 = 3/5\n\n**Adding fractions with different denominators:**\n1. Find the Least Common Denominator (LCD)\n2. Convert both fractions to have the LCD\n3. Add the numerators\n4. Simplify if possible\n\nExample: 1/3 + 1/4\n• LCD of 3 and 4 = 12\n• 1/3 = 4/12\n• 1/4 = 3/12\n• 4/12 + 3/12 = 7/12\n\n**Pro tip:** Think of it like combining groups of the same size pieces!",
    "visualExample": "If you drink 1/3 of a water bottle in the morning and 1/4 in the afternoon, you drank 7/12 of the bottle total.",
    "hints": [
      "Denominators must be the same before adding",
      "Only add the numerators when denominators match",
      "Always check if you can simplify"
    ],
    "practiceQuestions": [
      {
        "id": "l2q1",
        "question": "What is 2/7 + 3/7?",
        "options": ["5/7", "5/14", "6/7", "1/7"],
        "correctAnswer": 0,
        "hint": "The denominators are the same, so just add the numerators!",
        "encouragement": "Perfect! Same denominators make it simple! 🎉",
        "explanation": "When denominators are the same, add numerators: 2+3 = 5, so answer is 5/7."
      },
      {
        "id": "l2q2",
        "question": "What is 1/2 + 1/4?",
        "options": ["2/6", "3/4", "1/3", "2/4"],
        "correctAnswer": 1,
        "hint": "Convert 1/2 to fourths first: 1/2 = 2/4",
        "encouragement": "You mastered adding with different denominators! 🌈",
        "explanation": "1/2 = 2/4, so 2/4 + 1/4 = 3/4."
      },
      {
        "id": "l2q3",
        "question": "What is 1/3 + 1/6?",
        "options": ["2/9", "1/2", "2/6", "1/3"],
        "correctAnswer": 1,
        "hint": "The LCD of 3 and 6 is 6. Convert 1/3 to sixths.",
        "encouragement": "Wonderful! You handled that like a pro! ⭐",
        "explanation": "1/3 = 2/6, so 2/6 + 1/6 = 3/6 = 1/2."
      }
    ]
  },
  {
    "id": "l3",
    "title": "Introduction to Algebra",
    "concept": "Algebra Basics",
    "subject": "Mathematics",
    "duration": "10 min",
    "order": 3,
    "content": "Algebra is like solving a mystery — you're finding the unknown! 🔍\n\n**What is a variable?**\nA variable is a letter (like x, y, or n) that represents an unknown number.\n\nThink of it as a box: □ + 3 = 7\nWhat goes in the box? The answer is 4!\nIn algebra, we write: x + 3 = 7, so x = 4\n\n**Simple equations:**\n• x + 5 = 12 → x = 7 (subtract 5 from both sides)\n• 2x = 10 → x = 5 (divide both sides by 2)\n• x - 3 = 8 → x = 11 (add 3 to both sides)\n\n**Why algebra matters:**\nAlgebra helps us solve real-life problems! Like figuring out how many more points you need to reach a goal, or splitting a bill equally among friends.",
    "visualExample": "If you have some marbles in a bag and your friend gives you 5 more, now you have 12. How many were in the bag? That's algebra: x + 5 = 12!",
    "hints": [
      "A variable is just a placeholder for a number we need to find",
      "Whatever you do to one side of the equation, do to the other",
      "Check your answer by plugging it back in"
    ],
    "practiceQuestions": [
      {
        "id": "l3q1",
        "question": "If x + 4 = 9, what is x?",
        "options": ["4", "5", "9", "13"],
        "correctAnswer": 1,
        "hint": "Subtract 4 from both sides of the equation",
        "encouragement": "You solved the mystery! 🔍",
        "explanation": "x + 4 = 9, so x = 9 - 4 = 5."
      },
      {
        "id": "l3q2",
        "question": "If 3x = 15, what is x?",
        "options": ["3", "15", "5", "45"],
        "correctAnswer": 2,
        "hint": "Divide both sides by 3",
        "encouragement": "Brilliant algebraic thinking! 💡",
        "explanation": "3x = 15, so x = 15 ÷ 3 = 5."
      },
      {
        "id": "l3q3",
        "question": "Which is the variable in: 2y + 7 = 15?",
        "options": ["2", "7", "y", "15"],
        "correctAnswer": 2,
        "hint": "The variable is the letter that represents the unknown",
        "encouragement": "You spotted it right away! 🎯",
        "explanation": "y is the variable — it's the unknown we need to find."
      }
    ]
  },
  {
    "id": "l4",
    "title": "Area and Perimeter",
    "concept": "Geometry",
    "subject": "Mathematics",
    "duration": "10 min",
    "order": 4,
    "content": "Let's explore the space around and inside shapes! 📐\n\n**Perimeter** = the distance around a shape (like walking around a garden)\n**Area** = the space inside a shape (like the grass in the garden)\n\n**Rectangle:**\n• Perimeter = 2 × (length + width)\n• Area = length × width\n\n**Square:**\n• Perimeter = 4 × side\n• Area = side × side\n\n**Triangle:**\n• Perimeter = sum of all three sides\n• Area = ½ × base × height\n\n**Real-life uses:**\n• Buying a fence for your garden → Perimeter\n• Buying carpet for your room → Area\n• Wrapping a gift box → Area\n• Putting a border on a photo → Perimeter",
    "visualExample": "Your classroom is 10m long and 8m wide. To put tiles on the floor, you need the area: 10 × 8 = 80 sq meters. To put a border strip, you need the perimeter: 2 × (10+8) = 36 meters.",
    "hints": [
      "Perimeter is the outside edge, Area is the inside space",
      "Perimeter is measured in units (m, cm)",
      "Area is measured in square units (m², cm²)"
    ],
    "practiceQuestions": [
      {
        "id": "l4q1",
        "question": "What is the area of a rectangle with length 6cm and width 4cm?",
        "options": ["10 cm²", "20 cm²", "24 cm²", "48 cm²"],
        "correctAnswer": 2,
        "hint": "Area = length × width",
        "encouragement": "You calculated that perfectly! 📐",
        "explanation": "Area = 6 × 4 = 24 cm²."
      },
      {
        "id": "l4q2",
        "question": "What is the perimeter of a square with side 5m?",
        "options": ["10m", "20m", "25m", "15m"],
        "correctAnswer": 1,
        "hint": "A square has 4 equal sides",
        "encouragement": "Geometry master in the making! 🏆",
        "explanation": "Perimeter = 4 × 5 = 20m."
      },
      {
        "id": "l4q3",
        "question": "If you want to put a fence around your garden, do you need area or perimeter?",
        "options": ["Area", "Perimeter", "Both", "Neither"],
        "correctAnswer": 1,
        "hint": "A fence goes around the outside of the garden",
        "encouragement": "Great real-world application! 🌿",
        "explanation": "A fence goes around the boundary, so you need the perimeter."
      }
    ]
  },
  {
    "id": "l5",
    "title": "States of Matter",
    "concept": "Matter",
    "subject": "Science",
    "duration": "10 min",
    "order": 5,
    "content": "Everything around us is made of matter — and it comes in three main forms! 🧪\n\n**Solid** — has a fixed shape and volume\nExamples: Book, table, ice cube, your pencil\nParticles: Tightly packed, vibrate in place\n\n**Liquid** — has a fixed volume but takes the shape of its container\nExamples: Water, milk, juice, oil\nParticles: Close together but can slide past each other\n\n**Gas** — has no fixed shape or volume, fills its container\nExamples: Air, steam, oxygen, cooking gas\nParticles: Far apart, move freely and fast\n\n**Changing states:**\n• Solid → Liquid = **Melting** (ice → water)\n• Liquid → Gas = **Evaporation** (water → steam)\n• Gas → Liquid = **Condensation** (steam → water drops)\n• Liquid → Solid = **Freezing** (water → ice)\n\n**Fun fact:** You see all three states of water every day — ice in your drink, water from the tap, and steam from chai! ☕",
    "visualExample": "Watch an ice cube melting in the sun — it goes from solid (ice) to liquid (water). Leave it longer and it evaporates into gas (water vapor)!",
    "hints": [
      "Think about how particles are arranged in each state",
      "Solids hold shape, liquids flow, gases spread",
      "Adding heat usually changes solid→liquid→gas"
    ],
    "practiceQuestions": [
      {
        "id": "l5q1",
        "question": "Which state of matter has particles that are tightly packed?",
        "options": ["Gas", "Liquid", "Solid", "Plasma"],
        "correctAnswer": 2,
        "hint": "Think about which state holds its shape firmly",
        "encouragement": "You know your particles! 🔬",
        "explanation": "Solids have tightly packed particles that vibrate in place."
      },
      {
        "id": "l5q2",
        "question": "What is it called when water turns to ice?",
        "options": ["Melting", "Evaporation", "Condensation", "Freezing"],
        "correctAnswer": 3,
        "hint": "Water (liquid) turning to ice (solid) — what happens when things get very cold?",
        "encouragement": "Cool answer! Literally! 🧊",
        "explanation": "When liquid water loses heat and becomes solid ice, it's called freezing."
      },
      {
        "id": "l5q3",
        "question": "Steam from hot chai is an example of which state?",
        "options": ["Solid", "Liquid", "Gas", "All three"],
        "correctAnswer": 2,
        "hint": "Steam rises and spreads in the air...",
        "encouragement": "That's the spirit! Science is in everyday life! ☕",
        "explanation": "Steam is water in its gas state — the particles have lots of energy and spread freely."
      }
    ]
  },
  {
    "id": "l6",
    "title": "Photosynthesis",
    "concept": "Plant Biology",
    "subject": "Science",
    "duration": "10 min",
    "order": 6,
    "content": "Plants are amazing chefs — they cook their own food using sunlight! 🌿☀️\n\n**Photosynthesis** = the process by which plants make food\n\n**The Recipe:**\n• **Ingredients:** Carbon dioxide (CO₂) + Water (H₂O)\n• **Energy source:** Sunlight ☀️\n• **Kitchen:** Chloroplasts (inside leaf cells)\n• **Chef:** Chlorophyll (the green pigment)\n• **Dish prepared:** Glucose (sugar) + Oxygen (O₂)\n\n**The Equation:**\n6CO₂ + 6H₂O + Sunlight → C₆H₁₂O₆ + 6O₂\n\n**Step by step:**\n1. Roots absorb water from the soil\n2. Leaves take in CO₂ through tiny pores (stomata)\n3. Chlorophyll captures sunlight energy\n4. This energy converts CO₂ and water into glucose\n5. Oxygen is released as a bonus!\n\n**Why it matters:**\n• Plants give us oxygen to breathe\n• Plants are the base of all food chains\n• Without photosynthesis, there would be no life on Earth!",
    "visualExample": "A plant is like a tiny factory: roots are the pipes bringing water, leaves are solar panels catching light, and the whole plant runs on this clean, green energy!",
    "hints": [
      "Photo = light, Synthesis = making something",
      "Chlorophyll is why leaves are green",
      "Plants take in CO₂ and release O₂ — opposite of us!"
    ],
    "practiceQuestions": [
      {
        "id": "l6q1",
        "question": "What gas do plants take in during photosynthesis?",
        "options": ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
        "correctAnswer": 2,
        "hint": "We breathe this out, and plants take it in",
        "encouragement": "You and the plants make a great team! 🌱",
        "explanation": "Plants absorb carbon dioxide (CO₂) from the air through their stomata."
      },
      {
        "id": "l6q2",
        "question": "What gives leaves their green color?",
        "options": ["Glucose", "Chlorophyll", "Oxygen", "Water"],
        "correctAnswer": 1,
        "hint": "It's the special pigment that captures sunlight",
        "encouragement": "Brilliant! You know your biology! 🍃",
        "explanation": "Chlorophyll is the green pigment in chloroplasts that absorbs sunlight for photosynthesis."
      },
      {
        "id": "l6q3",
        "question": "What is the food that plants make during photosynthesis?",
        "options": ["Protein", "Starch", "Glucose", "Vitamins"],
        "correctAnswer": 2,
        "hint": "It's a type of sugar",
        "encouragement": "Sweet answer! 🍬",
        "explanation": "Plants produce glucose (a sugar) as food during photosynthesis."
      }
    ]
  },
  {
    "id": "l7",
    "title": "Linear Equations",
    "concept": "Algebra Basics",
    "subject": "Mathematics",
    "duration": "10 min",
    "order": 7,
    "content": "Let's level up our algebra skills with linear equations! 📈\n\n**What is a linear equation?**\nAn equation where the highest power of the variable is 1.\nExamples: 2x + 3 = 11, y - 5 = 10\n\n**Solving in steps:**\n1. Simplify both sides\n2. Move variables to one side\n3. Move numbers to the other side\n4. Solve for the variable\n\n**Example:** 3x + 4 = 19\nStep 1: Subtract 4 from both sides → 3x = 15\nStep 2: Divide both sides by 3 → x = 5\nCheck: 3(5) + 4 = 15 + 4 = 19 ✓\n\n**Word Problem:**\n\"Priya has some chocolates. She gets 7 more and now has 15.\"\nEquation: x + 7 = 15 → x = 8\nPriya had 8 chocolates!",
    "visualExample": "Think of a balance scale — both sides must be equal. Whatever you do to one side, you must do to the other to keep it balanced.",
    "hints": [
      "Keep the equation balanced like a see-saw",
      "Opposite operations cancel: +/- and ×/÷",
      "Always check your answer by substituting back"
    ],
    "practiceQuestions": [
      {
        "id": "l7q1",
        "question": "Solve: 2x + 6 = 14",
        "options": ["x = 3", "x = 4", "x = 5", "x = 10"],
        "correctAnswer": 1,
        "hint": "First subtract 6 from both sides, then divide by 2",
        "encouragement": "Equation master! 🧮",
        "explanation": "2x + 6 = 14 → 2x = 8 → x = 4."
      },
      {
        "id": "l7q2",
        "question": "Solve: 5x - 10 = 25",
        "options": ["x = 3", "x = 5", "x = 7", "x = 15"],
        "correctAnswer": 2,
        "hint": "Add 10 to both sides first",
        "encouragement": "You're solving like a champion! 🏅",
        "explanation": "5x - 10 = 25 → 5x = 35 → x = 7."
      },
      {
        "id": "l7q3",
        "question": "Is 3x² + 2 = 8 a linear equation?",
        "options": ["Yes", "No", "Sometimes", "Only if x = 1"],
        "correctAnswer": 1,
        "hint": "Check the highest power of the variable",
        "encouragement": "Sharp observation! You noticed the x²! 🔍",
        "explanation": "No — the variable x has power 2 (x²), so it's a quadratic, not linear."
      }
    ]
  },
  {
    "id": "l8",
    "title": "Force and Motion",
    "concept": "Physics Basics",
    "subject": "Science",
    "duration": "10 min",
    "order": 8,
    "content": "What makes things move? Let's discover the power of force! 💪\n\n**What is Force?**\nA push or pull that can change an object's state of motion.\nForce has both magnitude (how strong) and direction.\n\n**Newton's Laws of Motion:**\n\n**1st Law (Inertia):**\nAn object at rest stays at rest, and a moving object keeps moving, unless a force acts on it.\nExample: A ball on the ground won't move until you kick it!\n\n**2nd Law (F = ma):**\nForce = Mass × Acceleration\nMore force → more acceleration\nMore mass → harder to accelerate\n\n**3rd Law (Action-Reaction):**\nFor every action, there is an equal and opposite reaction.\nExample: When you push against a wall, the wall pushes back on you!\n\n**Types of forces:**\n• Gravity — pulls everything toward Earth\n• Friction — opposes motion between surfaces\n• Normal force — surface pushes back on objects\n• Applied force — you pushing or pulling something",
    "visualExample": "When you ride a bicycle: your legs apply force to pedals, friction between tires and road moves you forward, air resistance pushes against you, and gravity keeps you on the ground!",
    "hints": [
      "Force changes how things move",
      "Heavier objects need more force to move",
      "Forces always come in pairs (action-reaction)"
    ],
    "practiceQuestions": [
      {
        "id": "l8q1",
        "question": "According to Newton's 1st Law, what happens to a ball at rest if no force acts on it?",
        "options": ["It starts moving", "It stays at rest", "It disappears", "It vibrates"],
        "correctAnswer": 1,
        "hint": "Objects are lazy — they don't like to change what they're doing!",
        "encouragement": "Inertia master! Newton would be proud! 🍎",
        "explanation": "An object at rest stays at rest unless acted upon by an external force."
      },
      {
        "id": "l8q2",
        "question": "If F = ma, and mass doubles while force stays the same, what happens to acceleration?",
        "options": ["Doubles", "Stays same", "Halves", "Triples"],
        "correctAnswer": 2,
        "hint": "If F = ma, then a = F/m. If m doubles...",
        "encouragement": "Great mathematical reasoning! 🧠",
        "explanation": "a = F/m. If m doubles, a = F/2m, so acceleration halves."
      },
      {
        "id": "l8q3",
        "question": "When you jump, you push Earth down. What does Earth do?",
        "options": ["Nothing", "Pushes you up", "Pulls you down more", "Spins faster"],
        "correctAnswer": 1,
        "hint": "Think about Newton's 3rd Law — action and reaction",
        "encouragement": "Equal and opposite — you've got it! 🚀",
        "explanation": "By Newton's 3rd Law, Earth pushes you up with equal force — that's why you go up!"
      }
    ]
  }
]

# Map concept name to concept ID
CONCEPT_MAP = {
    "Fractions": "c2",
    "Adding Fractions": "c4",
    "Algebra Basics": "c6",
    "Geometry": "c7",
    "Matter": "c11",
    "Plant Biology": "c12",
    "Physics Basics": "c13",
    "Linear Equations": "c8"
}

@router.get("")
def get_lessons():
    return BASE_LESSONS

@router.get("/{lesson_id}")
def get_lesson(lesson_id: str, student_id: str = "s1", session: Session = Depends(get_session)):
    lesson_template = None
    for l in BASE_LESSONS:
        if l["id"] == lesson_id:
            lesson_template = dict(l)
            break

    if not lesson_template:
        raise HTTPException(status_code=404, detail=f"Lesson {lesson_id} not found")

    student = session.get(Student, student_id)
    if student:
        concept_name = lesson_template["concept"]
        concept_id = CONCEPT_MAP.get(concept_name)
        
        mastery_score = 0.0
        if concept_id:
            mastery = session.exec(
                select(StudentConceptMastery)
                .where(StudentConceptMastery.student_id == student_id)
                .where(StudentConceptMastery.concept_id == concept_id)
            ).first()
            if mastery:
                mastery_score = mastery.score

        diag_level = student.diagnostic_level or "Growing"

        personalization = ""
        if diag_level == "Needs Nurturing":
            personalization += "\n**🌱 Warm-up Foundation Note:**\nTake it slow! Remember, we can draw a picture or use blocks whenever we feel stuck. Let's do this together!\n\n"
        elif diag_level == "Blooming":
            personalization += "\n**🚀 Advanced Challenge Mode:**\nThink deeply: How does this connect to other math branches? Let's check the challenge questions below!\n\n"

        if mastery_score < 40.0:
            personalization += "\n**💡 Nurturing Concept Guidance:**\nFocus on the visual example first. Visualizing the problem makes the math simple!\n\n"

        # Prepend personalization
        lesson_template["content"] = personalization + lesson_template["content"]

    return lesson_template
