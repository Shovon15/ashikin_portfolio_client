const Example = () => {
	const tabButtondata = [
		{
			id: 1,
			label: "All Events",
			value: "all",
		},
		{
			id: 2,
			label: "Free Events",
			value: "free",
		},

		{
			id: 3,
			label: "Premium Events",
			value: "premium",
		},
	];
	return (
		<div className="min-h-screen border border-red-500">
			<div className="mb-4 border-b border-gray-200 dark:border-gray-700">
				<ul
					className="flex flex-wrap -mb-px text-sm font-medium text-center"
					id="default-tab"
					data-tabs-toggle="#default-tab-content"
					role="tablist"
				>
					{tabButtondata.map((data) => (
						<li key={data.id} className="me-2" role="presentation">
							<button
								className="inline-block p-4 border-b-2 rounded-t-lg"
								id={data.value}
								data-tabs-target="#profile"
								type="button"
								role="tab"
								aria-controls="profile"
								aria-selected="false"
							>
								Profile
							</button>
						</li>
					))}
				</ul>
			</div>
			<div id="default-tab-content">
				<div
					className=" p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
					id="profile"
					role="tabpanel"
					aria-labelledby="profile-tab"
				>
					<p className="text-sm text-gray-500 dark:text-gray-400">
						This is some placeholder content the{" "}
						<strong className="font-medium text-gray-800 dark:text-white">
							Profile associated content
						</strong>
						. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript
						swaps classNamees to control the content visibility and styling.
					</p>
				</div>
				<div
					className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
					id="dashboard"
					role="tabpanel"
					aria-labelledby="dashboard-tab"
				>
					<p className="text-sm text-gray-500 dark:text-gray-400">
						This is some placeholder content the{" "}
						<strong className="font-medium text-gray-800 dark:text-white">
							Dashboard associated content
						</strong>
						. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript
						swaps classNamees to control the content visibility and styling.
					</p>
				</div>
				<div
					className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
					id="settings"
					role="tabpanel"
					aria-labelledby="settings-tab"
				>
					<p className="text-sm text-gray-500 dark:text-gray-400">
						This is some placeholder content the{" "}
						<strong className="font-medium text-gray-800 dark:text-white">
							Settings associated content
						</strong>
						. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript
						swaps classNamees to control the content visibility and styling.
					</p>
				</div>
				<div
					className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
					id="contacts"
					role="tabpanel"
					aria-labelledby="contacts-tab"
				>
					<p className="text-sm text-gray-500 dark:text-gray-400">
						This is some placeholder content the{" "}
						<strong className="font-medium text-gray-800 dark:text-white">
							Contacts associated content
						</strong>
						. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript
						swaps classNamees to control the content visibility and styling.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Example;
