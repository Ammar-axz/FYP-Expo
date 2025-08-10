// import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
// import React from 'react';

import { router } from "expo-router";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// const Card = ({ title,FunctionOnPress }) => {
//   return (
//     <View style={styles.wrapper} >
//       <TouchableOpacity onPress={FunctionOnPress}>
//       <ImageBackground
//         style={styles.cardImage}
//         source={require('../../assets/images/card.png')}
//         resizeMode="cover"
//       >
//       </ImageBackground>
//       <View style={styles.textRow}>
//         <Text style={styles.titleText}>{title}</Text>
//         <View style={styles.ratingContainer}>
//           <Image
//             source={require('../../assets/icons/star.png')}
//             style={styles.starIcon}
//             resizeMode="contain"
//           />
//           <Text style={styles.ratingText}>4.64</Text>
//         </View>
//       </View>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   wrapper: {
//     backgroundColor: 'white',
//     padding: 10,
//     borderRadius: 10,
//     borderColor: '#00000026',
//     borderWidth: 1,
//     flex: 1,
//     marginVertical: 10,
//   },
//   cardImage: {
//     width: '100%',
//     height: 200,
//     borderRadius: 12,
//     overflow: 'hidden'
//   },
//   textRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   titleText: {
//     flex: 2,
//     fontSize: 20,
//     fontWeight: '600',
//   },
//   ratingContainer: {
//     flex: 1,
//     flexDirection: 'row', // Aligns icon and text in the same row
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//   },
//   starIcon: {
//     width: 16, // Adjust size as needed
//     height: 16,
//     marginRight: 5, // Add spacing between the icon and text
//   },
//   ratingText: {
//     fontSize: 16,
//     fontWeight: '500',
//     textAlign: 'right',
//   },
// });

// export default Card;

const Card = ({ student_class }) => {
  console.log("student_class data:", student_class);

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "ClassDetails",
            params: {
              Class: encodeURIComponent(JSON.stringify(student_class)),
            },
          });
        }}
      >
        <ImageBackground
          style={styles.cardImage}
          source={require("../../assets/images/card.png")}
          resizeMode="cover"
        />
        <View style={styles.textRow}>
          <Text style={styles.titleText}>
            {student_class?.Class_Name ?? student_class?.class_name ?? "Unnamed Class"}
          </Text>
          <View style={styles.ratingContainer}>
            <Image
              source={require("../../assets/icons/star.png")}
              style={styles.starIcon}
              resizeMode="contain"
            />
            <Text style={styles.ratingText}>{student_class?.rating ?? "4.64"}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    borderColor: "#00000026",
    borderWidth: 1,
    flex: 1,
    marginVertical: 10,
  },
  cardImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
  },
  textRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  titleText: {
    flex: 2,
    fontSize: 20,
    fontWeight: "600",
  },
  ratingContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "right",
  },
});
