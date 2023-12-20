/* eslint-disable react/prop-types */
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
	page: {
		flexDirection: "row",
		backgroundColor: "#ffffff",
	},
	section: {
		margin: 10,
		padding: 10,
		flexGrow: 1,
		borderColor: "black",
		borderWidth: 1,
		fontFamily: "Times-Roman", // Set the font family to Times New Roman
	},
	row: {
		flexDirection: "row",
		marginBottom: 5,
		borderBottomColor: "black",
		borderBottomWidth: 1,
	},
	label: {
		width: "40%",
		fontWeight: "bold",
		borderRightColor: "black",
		borderRightWidth: 1,
		paddingRight: 5,
		fontFamily: "Times-Roman", // Set the font family to Times New Roman
	},
	value: {
		width: "60%",
		paddingLeft: 5,
		fontFamily: "Times-Roman", // Set the font family to Times New Roman
	},
});

// Create Document Component
const PDFMaker = ({ data }) => (
	<Document>
		<Page size="A4" style={styles.page}>
			<View style={styles.section}>
				<View style={styles.row}>
					<Text style={styles.label}>Registered for:</Text>
					<Text style={styles.value}>{data.title}</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.label}>Event Type:</Text>
					<Text style={styles.value}>{data.eventType}</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.label}>Name:</Text>
					<Text style={styles.value}>
						{data.firstName} {data.lastName}
					</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.label}>Whatsapp:</Text>
					<Text style={styles.value}>{data.whatsapp}</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.label}>Phone:</Text>
					<Text style={styles.value}>{data.phone}</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.label}>Email:</Text>
					<Text style={styles.value}>{data.email}</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.label}>Institute Name:</Text>
					<Text style={styles.value}>{data.instituteName}</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.label}>Account Number:</Text>
					<Text style={styles.value}>{data.accountNumber}</Text>
				</View>
			</View>
		</Page>
	</Document>
);

export default PDFMaker;
