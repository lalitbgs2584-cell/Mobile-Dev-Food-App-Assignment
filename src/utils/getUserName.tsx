import AsyncStorage from "@react-native-async-storage/async-storage";

async function getUserName() {
    try {
        const user = await AsyncStorage.getItem('user');
        const userName = user ? JSON.parse(user).firstname : 'Guest';
        return userName;
    } catch (error) {
        console.error('Error retrieving user name:', error);
        return 'Guest';
    }
    
}