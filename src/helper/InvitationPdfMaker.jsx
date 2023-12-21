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
const InvitationPdfMaker = ({ data }) => (
	<Document>
		<Page size="A4" style={styles.page}>
			<View style={styles.section}>
				<View style={styles.row}>
					<Text style={styles.label}>Name:</Text>
					<Text style={styles.value}>{data.name}</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.label}>Organization Name:</Text>
					<Text style={styles.value}>{data.organizationName}</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.label}>Phone:</Text>
					<Text style={styles.value}>{data.phone}</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.label}>Location:</Text>
					<Text style={styles.value}>{data.location}</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.label}>Number of Audience:</Text>
					<Text style={styles.value}>{data.audienceNumber}</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.label}>About Event:</Text>
					<Text style={styles.value}>{data.eventText}</Text>
				</View>
			</View>
		</Page>
	</Document>
);

export default InvitationPdfMaker;
