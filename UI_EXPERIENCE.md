# SCHOOLQUEST education experience

The responsive website and Capacitor previews render the same Next.js components.
This redesign builds on the fixed mobile navigation work in PR #4.

## Experience

- Learners land on a dedicated dashboard: class-specific subjects, a real next lesson or unfinished practice paper, XP, streak, completed paper count, and recent results. No sample progress is inserted by the UI; empty accounts get an honest starting state.
- Teachers see classrooms, enrolled learner count, marking queue and content upload actions. School managers see enrollment, fees and attendance. Administrators retain their authorized people, content and readiness tools.
- Profile is a persistent navigation destination with account details, editing, role-appropriate progress and sign-out. Active navigation follows the most specific matching route.
- Sign-in has illustrated role buttons, explicit labels, password visibility, pending state and role-preserving errors. It no longer publishes a directory of account names and phone numbers. Existing credential and Google authentication flows remain in place.
- The welcome page explains the learning journey with clear sign-in and registration routes, curriculum stages and an educator entry point. Attribution is available without a scrolling institutional-affiliation banner.

## Visual and interaction system

Emerald, ink blue, mint, lilac and warm yellow; one sans-serif hierarchy; rounded subject cards; code-native book illustrations; restrained entrance and floating animations; tactile button feedback. No new image downloads or animation libraries are required. Persistent chrome is outside transformed page content. Reduced-motion preferences disable decorative motion, controls have visible focus, and forms use accessible labels.

Learning-pattern references (inspiration, not copied branding):
- https://blog.duolingo.com/new-duolingo-home-screen-design/ — clear next activity and learning path.
- https://support.khanacademy.org/hc/en-us/articles/28808679033229-Where-can-I-see-my-course-levels — course-specific learner navigation.
- https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions — motion preferences.

## Validation

Production build/type checking; targeted ESLint; existing authentication/evidence tests.
Manual local-demo checks cover learner login, Profile navigation, invalid teacher login retaining the role, teacher dashboard, school dashboard, mobile and desktop layouts. Native previews load the Mac server at localhost:3001 using the separate Capacitor checkout.

This change does not deploy the Netlify server or publish native store binaries. Hosted apps receive the design after the web deployment is updated. Google native sign-in and store billing remain separate mobile-release work. Conversion or retention improvements should be measured after release rather than claimed from design alone.
