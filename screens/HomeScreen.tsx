import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { Button, Card, Chip, FAB, IconButton, Text } from "react-native-paper";
import moment from "moment";

import type { ListRenderItemInfo } from "react-native";

import { TaskStatusDTO } from "@/constants";

import type { TaskDTO } from "@/dtos";

interface HomeScreenProps {
  tasks: Array<TaskDTO>;
  isLoading: boolean;
  isLoggingout: boolean;
  onRefresh: () => void;
  onPressEdit: (id: string) => void;
  onPressDelete: (id: string) => void;
  onPressView: (id: string) => void;
  onPressAddTask: () => void;
  onPressLogout: () => void;
}

function HomeScreen(props: HomeScreenProps) {
  function renderTaskItem({ item: task }: ListRenderItemInfo<TaskDTO>) {
    function onPressEdit() {
      props.onPressEdit(task._id);
    }

    function onPressDelete() {
      props.onPressDelete(task._id);
    }

    function onPressView() {
      props.onPressView(task._id);
    }
    return (
      <Card onPress={onPressView} style={styles.itemContainer}>
        <Card.Title
          title={task.title}
          titleVariant="headlineSmall"
          subtitle={task.description}
          subtitleVariant="bodyLarge"
          subtitleNumberOfLines={2}
          subtitleStyle={{ color: "grey" }}
          titleStyle={{ paddingBottom: 10 }}
          right={(props) => (
            <View style={styles.itemActionContainer}>
              <IconButton
                icon={"pencil"}
                size={props.size}
                iconColor="skyblue"
                onPress={onPressEdit}
              />
              <IconButton
                icon={"trash-can"}
                size={props.size}
                iconColor="red"
                onPress={onPressDelete}
              />
            </View>
          )}
        />
        <Card.Content style={{ paddingTop: 10 }}>
          <Chip
            style={{
              backgroundColor:
                task.status == TaskStatusDTO.COMPLETED ? "green" : "blue",
              maxWidth: 180,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
            }}
            textStyle={{ textAlign: "center", flex: 1 }}
          >
            {task.status.split("_").join(" ")}
          </Chip>
        </Card.Content>
        <Card.Content style={styles.itemCreation}>
          <Text variant="bodyLarge">
            {moment(task.createdAt).format("lll")}
          </Text>
          <Text variant="bodyLarge">{task.createdBy.name}</Text>
        </Card.Content>
      </Card>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList<TaskDTO>
        data={props.tasks}
        keyExtractor={(task) => task._id}
        renderItem={renderTaskItem}
        refreshControl={
          <RefreshControl
            refreshing={props.isLoading}
            onRefresh={props.onRefresh}
          />
        }
        contentContainerStyle={styles.content}
        ListEmptyComponent={<Text>No Tasks Found</Text>}
      />
      <FAB
        icon="plus"
        color="white"
        style={styles.fab}
        onPress={props.onPressAddTask}
      />
      <Button
        mode="outlined"
        textColor="red"
        rippleColor={"red"}
        onPress={props.onPressLogout}
        style={{ borderRadius: 0, borderColor: "red" }}
        loading={props.isLoggingout}
        disabled={props.isLoggingout}
        icon={"logout"}
      >
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  content: {
    rowGap: 20,
    paddingVertical: 20,
    paddingBottom: 120,
  },
  itemContainer: {
    paddingTop: 10,
  },
  itemActionContainer: {
    flexDirection: "row",
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 64,
    backgroundColor: "blue",
  },
  itemCreation: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export type { HomeScreenProps };
export { HomeScreen };
