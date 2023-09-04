import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, Ionicons } from "@expo/vector-icons";
import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import HeaderTittle from "../components/HeaderTittle";
import HeaderIconBtnBack from "../components/HeaderIconBtnBack";


const Tabs = createBottomTabNavigator();

export default Home = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "ProfileScreen") {
            iconName = focused ? "user" : "user";
            return <Feather name={iconName} size={24} color={color} />;
          } else if (route.name === "PostsScreen") {
            iconName = focused ? "grid" : "grid-outline";
            return <Ionicons name={iconName} size={24} color={color} />;
          } else if (route.name === "CreatePostsScreen") {
            // iconName = focused ? "plus" : "plus";
            color = focused ? "#212121CC" : "#FFFFFF";
            return (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#FF6C00',
                  width: 70,
                  height: 40,
                  borderRadius: 20,
                }}
              >
                <Feather name={"plus"} size={24} color={color} />
              </View>
            )
          }
        },
        tabBarActiveTintColor: "#FF6C00",
        tabBarInactiveTintColor: "#212121CC",
      
        headerRightContainerStyle: { paddingRight: 16, paddingBottom: 9 },
        headerLeftContainerStyle: { paddingLeft: 16, paddingBottom: 9 },
        tabBarStyle: { height: 70, justifyContent: 'center' },
        tabBarShowLabel: false,
      })}
    >
      <Tabs.Screen name="PostsScreen" component={PostsScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerTitle: () => <HeaderTittle Tittle={"Публікації"} />,
          headerRight: () => <HeaderIconBtnLogout />,
        }} />
      <Tabs.Screen name="CreatePostsScreen" component={CreatePostsScreen}
        options={{
          headerShown: true,
          tabBarStyle: { display: 'none' },
          headerTitleAlign: "center",
          headerLeft: () => <HeaderIconBtnBack />,
          headerTitle: () => <HeaderTittle Tittle={"Створити публікацію"} />,
        }} />
      <Tabs.Screen name="ProfileScreen" component={ProfileScreen}
        options={{
          headerShown: false,
        }} />
    </Tabs.Navigator>
  );
};

