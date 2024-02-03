import withAuth from "../../../HOC/withAuth"

const MainPage = withAuth(() => {
	return (
		<div>
			<h1>This is main page</h1>
      <p>it is secured route and can't be accessed without authorization... in theory...</p>
		</div>
	)
})

export default MainPage
