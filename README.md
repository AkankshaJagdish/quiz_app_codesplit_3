# quiz_app_codesplit_3

**Objective**
- Code splitting is a technique used in software development where a large application's codebase is divided into smaller, more manageable chunks or modules. 
- Only the required chunks are loaded when needed, rather than loading the entire application upfront. 
- This helps improve app performance, reduce initial load times, and optimize network usage. 
- This makes the app faster and more efficient overall. 
- Web-apps have established solutions for code splitting but mobile apps do not yet have an effective support system for this.
- In this project, an exploration is made of Re.Pack, a code splitting solution for mobile apps, in order to determine it’s capabilities and usefulness.

**Solution**

Solution Design:
-Demo app: A Quiz application using Re.Pack for code splitting.
-App loads different UIs and questions based on the user's chosen subject.

Architecture:
- Bundling: Process of combining all code and assets into a single package for improved performance.
- Metro: JavaScript bundler and development server, streamlines React Native app development.
- Firebase: Google's comprehensive development platform offering various services for mobile and web app development.

Steps:
1. Setup: Configure react-native and webpack.
2. Add Dependencies: Include necessary dependencies like ‘re.pack’, '@react-native-async-storage/async-storage'.
3. Development Server: Run 'react-native webpack-start'.
4. Bundle App: Use 'react-native webpack-bundle' or 'webpack' CLI command.
5. Firebase Integration: Create Firebase app, add React Native app to it, enable Google Analytics.
6. React Native app in Firebase: Configure in Firebase Dashboard.
7. Download Config: Retrieve 'google-services.json' from Firebase, move to module directory.
8. Google Services Gradle Plugin: Add plugin to make config values accessible.
9. Firebase SDK: Add SDKs to Gradle file, run Gradle sync.
10. Cloud Storage Setup: In Firebase app dashboard, setup Cloud Storage to store code split chunks.

**Results**
- A demo app that displays code splitting using Re.Pack in a React-Native app. 
- A quiz app that will load a different UI and questions in different chunks depending on the choice of subject by the user.  
- Normal app apk size: 199.7 MB
- Chunked (code splitted) app app size:
- Initial loading chunk size: 19.4 MB
- Additional chunks (3 nos) size: 76.5 MB (Data Structures), 64.5MB (Microprocessors), 39.7 MB (Java Programming)
- At a given time Initial and one of the Additional chunk will be loaded. Max load size will be 95.9 MB (19.4 + 76.5)
- Effective size reduction: 51.97% MB 

**Use cases:**
- Apps having performance issues, especially in the startup area
- Applications that expose different functionalities or different UIs based on user’s details
- Super apps and applications with mini app stores
- Apps that may have to run on older devices



