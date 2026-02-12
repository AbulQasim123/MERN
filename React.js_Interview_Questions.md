# 📘 REACT COMPLETE INTERVIEW NOTES (Reusable Notepad)

============================================================

# 🟢 BASIC LEVEL

============================================================

## 1️⃣ What is React and why do we use it?

React is a JavaScript library created by Facebook for building fast and interactive user interfaces, especially Single Page Applications (SPA).

React uses a component-based architecture where UI is divided into reusable pieces called components.

Why we use React:
- Reusable components reduce development time  
- Virtual DOM makes UI updates fast  
- One-way data binding gives predictable behavior  
- Strong ecosystem and community  
- Easy to scale for large apps  

React helps build modern, dynamic, and high-performance web applications.

------------------------------------------------------------

## 2️⃣ What is JSX?

JSX (JavaScript XML) is a syntax that lets you write HTML-like code inside JavaScript.

Example:
`const element = <h1>Hello</h1>`

JSX is compiled into:
`React.createElement()`

Benefits:
- Easier UI structure  
- Improves readability  
- Prevents injection attacks  
- Combines UI + logic in one place  

------------------------------------------------------------

## 3️⃣ Difference between State and Props?

Props:
- Passed from parent to child  
- Read-only  
- Used to send data  
- Cannot be modified by child  

State:
- Managed inside component  
- Can change over time  
- Causes re-render when updated  
- Used for dynamic data  

------------------------------------------------------------

## 4️⃣ Functional Components

Functional components are simple JavaScript functions that return JSX.

They are modern and preferred because they support hooks.

Advantages:
- Less boilerplate  
- No `this` keyword  
- Easier to test  
- Cleaner code  

------------------------------------------------------------

## 5️⃣ Why use Key in Lists?

Keys help React identify which items changed, added, or removed.

Without keys React may re-render wrong elements.

Keys improve:
- Performance  
- Stability  
- UI correctness  

------------------------------------------------------------

## 6️⃣ Component Lifecycle

Lifecycle phases:
- Mounting (component created)  
- Updating (state/props change)  
- Unmounting (component removed)  

Handled in functional components using hooks like `useEffect`.

------------------------------------------------------------

## 7️⃣ useState Hook

`useState` lets functional components store and update data.

When state updates → component re-renders.

Used for:
- Counters  
- Form inputs  
- Toggle states  
- Dynamic UI  

------------------------------------------------------------

## 8️⃣ Class vs Functional Components

Class:
- Uses lifecycle methods  
- Uses `this`  
- More verbose  
- Older approach  

Functional:
- Uses hooks  
- Cleaner syntax  
- Faster to write  
- Modern standard  

------------------------------------------------------------

## 9️⃣ Conditional Rendering

Showing UI based on conditions.

Methods:
- Ternary operator  
- && operator  
- if statements  

Used for:
- Auth UI  
- Loading states  
- Error messages  

------------------------------------------------------------

## 🔟 React Fragment

Fragments let you group elements without adding extra DOM nodes.

Helps keep DOM clean and improves performance.

------------------------------------------------------------

============================================================

# 🟡 MEDIUM LEVEL

============================================================

## 1️⃣1️⃣ useEffect

useEffect handles side effects in components.

Examples:
- API calls  
- Timers  
- Event listeners  
- Subscriptions  

Runs after render.

------------------------------------------------------------

## 1️⃣2️⃣ Controlled vs Uncontrolled Components

Controlled:
- React controls input value  
- Uses state  
- Easier validation  

Uncontrolled:
- DOM controls input  
- Uses refs  
- Less control  

------------------------------------------------------------

## 1️⃣3️⃣ Prop Drilling

Passing props through many layers.

Problem:
- Messy code  
- Hard maintenance  

Solutions:
- Context API  
- Redux/Zustand  

------------------------------------------------------------

## 1️⃣4️⃣ Context API

Used for global state sharing.

Avoids prop drilling.

Common uses:
- Auth data  
- Theme  
- Language settings  

------------------------------------------------------------

## 1️⃣5️⃣ Custom Hooks

Reusable logic wrapped in functions.

Benefits:
- Code reuse  
- Cleaner components  
- Better organization  

------------------------------------------------------------

## 1️⃣6️⃣ Handling Forms

Using controlled components.

Popular libraries:
- React Hook Form  
- Formik  

Helps with:
- Validation  
- Submission  
- Performance  

------------------------------------------------------------

## 1️⃣7️⃣ Memoization

Caching results to avoid recalculations.

Tools:
- React.memo  
- useMemo  
- useCallback  

Improves performance.

------------------------------------------------------------

## 1️⃣8️⃣ useMemo vs useCallback

useMemo:
- Memoizes values  

useCallback:
- Memoizes functions  

Both reduce unnecessary renders.

------------------------------------------------------------

## 1️⃣9️⃣ Lifting State Up

Moving shared state to parent.

Ensures multiple children share same data.

------------------------------------------------------------

## 2️⃣0️⃣ Improving Performance

Methods:
- Memoization  
- Lazy loading  
- Code splitting  
- Virtualization  
- Avoid extra renders  
- Debouncing/throttling  

------------------------------------------------------------

============================================================

# 🔴 ADVANCED LEVEL

============================================================

## 2️⃣1️⃣ Reconciliation

React compares old Virtual DOM with new one.

Only updates changed parts.

Makes UI fast.

------------------------------------------------------------

## 2️⃣2️⃣ Virtual DOM vs Real DOM

Virtual DOM:
- Lightweight copy  
- Faster diffing  
- Efficient updates  

Real DOM:
- Actual browser DOM  
- Slow direct updates  

------------------------------------------------------------

## 2️⃣3️⃣ React Fiber

New reconciliation engine.

Features:
- Incremental rendering  
- Task prioritization  
- Smooth animations  
- Better responsiveness  

------------------------------------------------------------

## 2️⃣4️⃣ Error Boundaries

Catch JavaScript errors in UI.

Prevent app crash.

Used in class components.

------------------------------------------------------------

## 2️⃣5️⃣ Code Splitting & Lazy Loading

Load components only when needed.

Reduces bundle size.

Improves load time.

------------------------------------------------------------

## 2️⃣6️⃣ Stop Unnecessary Re-renders

Methods:
- React.memo  
- useMemo  
- useCallback  
- Proper keys  
- Split components  

------------------------------------------------------------

## 2️⃣7️⃣ State Batching (React 18)

Multiple updates grouped into one render.

Improves performance.

------------------------------------------------------------

## 2️⃣8️⃣ useEffect vs useLayoutEffect

useEffect:
- Runs after paint  
- Async  
- Non-blocking  

useLayoutEffect:
- Runs before paint  
- Sync  
- Can block UI  

------------------------------------------------------------

## 2️⃣9️⃣ Building Scalable Apps

Best practices:
- Good folder structure  
- Reusable components  
- State management  
- Lazy loading  
- Testing  
- TypeScript  

------------------------------------------------------------

## 3️⃣0️⃣ Polyfill-like Behavior

Creating fallback logic.

Examples:
- Custom hooks  
- Feature detection  
- API fallbacks  

Helps cross-browser support.

============================================================

✅ END OF REACT NOTES
Reusable | Copy-Friendly | Interview Ready

============================================================
