import './App.css'
import First from './First'
import Timer from './Timer'
import Users from './Users'
import AutoSaveForm from './AutoSaveForm'
import WindowSizeTracker from "./WindowSizeTracker"
import Counter from './Counter'
import UserProfile from './UserProfile'
import ToggleText from './ToggleText'
import InputExample from './InputExample'
import LikeButton from './LikeButton'
import Student from './Student'
import Todo from './Todo'
import ToDoLocalStorage from './ToDoLocalStorage'
import AnotherCounter from './AnotherCounter'
import Parent from './Parent'
import ExpenseTracker from './ExpenseTracker'
import ReactTableUsers from './ReactTableUsers'
import SimpleForm from './SimpleForm'
import MultiInputForm from './MultiInputForm'
import AdvancedForm from './AdvancedForm'
import UncontrolledForm from './UncontrolledForm'
import BasicValidationForm from './BasicValidationForm'
import PropsDrilling from './PropsDrilling'
import ReactRouter from './ReactRouter'
import MovieExplorer from './MovieExplorer'
import CustomHook from './CustomHook'
import ShoppingCart from './ShoppingCart'
import LayoutEffect from './LayoutEffect'
import Memo from './Memo'
import ContextExample from './ContextExample'
import ThirtyDayOfReact from './ThirtyDayOfReact'
function App() {

	{/* <Timer /> */ }
	{/* <WindowSizeTracker /> */ }
	{/* <AutoSaveForm /> */ }
	return (
		<>
			<div className="container">
				<h1 id="firstheading">React is a fun</h1>

				<div className="row">
					<div className="col-md-4">
						<First />
					</div>
					<div className="col-md-4">
						<Counter />
					</div>
					<div className="col-md-4">
						<UserProfile />
					</div>
					<div className="col-md-4">
						<ToggleText />
					</div>
					<div className="col-md-4">
						<InputExample />
					</div>
					<div className="col-md-4">
						<LikeButton />
					</div>
					<div className="col-md-4">
						<Student />
					</div>
					<div className="col-md-4">
						<AnotherCounter />
					</div>
					<div className="col-md-4">
						<Parent />
					</div>

					<div className="col-md-4">
						<Todo />
					</div>
					<div className="col-md-4">
						<ToDoLocalStorage />
					</div>
					<div className="col-md-4">
						<SimpleForm />
					</div>
					<div className="col-md-4">
						<MultiInputForm />
					</div>
					<div className="col-md-4">
						<AdvancedForm />
					</div>
					<div className="col-md-4">
						<UncontrolledForm />
					</div>
					<div className="col-md-4">
						<BasicValidationForm />
					</div>
					<div className="col-md-4">
						<PropsDrilling />
					</div>

					<div className="col-md-4">
						<ExpenseTracker />
					</div>

					<div className="col-md-4">
						<ReactRouter />
					</div>
					<div className="col-md-4">
						<CustomHook />
					</div>
					<div className="col-md-4">
						<LayoutEffect />
					</div>
					<div className="col-md-4">
						<Memo />
					</div>
					<div className="col-md-4">
						<ContextExample />
					</div>

					<div className="col-md-12">
						<Users />
					</div>
					<div className="col-md-12">
						<ThirtyDayOfReact />
					</div>
					<div className="col-md-12">
						<ReactTableUsers />
					</div>
					
					<div className="col-md-12">
						<MovieExplorer />
					</div>

					<div className="col-md-12">
						<ShoppingCart />
					</div>
				</div>
			</div>
		</>
	)
}

export default App
