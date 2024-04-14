import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  orderBy,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

//saving new items
export const saveItem = async (data) => {
  await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
    merge: true,
  });
};

//Save user only if its not in firestore
export const saveUser = async (data) => {
  // Query the Users collection to check if user data already exists
  const usersQuery = query(
    collection(firestore, "Users"),
    where("email", "==", data.email) // Assuming userId is a unique identifier for each user
  );

  // Execute the query
  const querySnapshot = await getDocs(usersQuery);

  // Check if any matching documents exist
  if (querySnapshot.size === 0) {
    // No matching documents found, save the user data
    await setDoc(doc(firestore, "Users", `${Date.now()}`), data, {
      merge: true,
    });
  }
};
export const getAllFoodItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "foodItems"), orderBy("id", "desc"))
  );
  return items.docs.map((doc) => doc.data());
};

export const saveOrderData = async (data) => {
  // Extract data properties
  const { addressLatLng, ...rest } = data;

  // Check if addressLatLng is defined
  let addressLatLngString = "";
  if (
    addressLatLng &&
    typeof addressLatLng === "object" &&
    "lat" in addressLatLng &&
    "lng" in addressLatLng
  ) {
    // Convert addressLatLng to a string representation
    addressLatLngString = `${addressLatLng.lat},${addressLatLng.lng}`;
  }

  // Create a new data object without addressLatLng or with addressLatLngString
  const newData =
    addressLatLngString !== ""
      ? { ...rest, addressLatLng: addressLatLngString }
      : rest;

  // Save the modified data to Firestore
  await setDoc(doc(firestore, "Orders", `${Date.now()}`), newData, {
    merge: true,
  });
};

export const savePaymentData = async (data) => {
  await setDoc(doc(firestore, "Paymentdata", `${Date.now()}`), data, {
    merge: true,
  });
};

//extra

export const getAllOrders = async () => {
  const ordersQuery = query(
    collection(firestore, "Orders"),
    orderBy("id", "desc")
  );
  const snapshot = await getDocs(ordersQuery);
  const orders = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return orders;
};
