import ast #Used for converting string to list

task_list = []

def add_task():
    task = input("Please add task to the list.\n")
    task_list.append(task)
    print(task_list)

def remove_task():
    print("Current tasks:" + str(task_list))
    remove = input("Which task would you like to remove?\n")
    task_list.remove(remove)
    print(task_list)

def view_tasks():
    print(task_list)

def save_and_exit():
    save_file = open("./save.json", "w")
    save_file.close()
    save_file = open("./save.json", "a")
    save_file.write("[\n")
    for i in task_list:
        if i == task_list[-1]:
            save_file.write('\t{\n\t\t"task": "' + str(i) + '"\n\t}\n')
        else:
            save_file.write('\t{\n\t\t"task": "' + str(i) + '"\n\t},\n')
    save_file.write("]")
    save_file.close()
    exit()

def load_tasks():
    load_file = open("./save.json", "r")
    global task_list
    task_list = load_file.read()
    task_list = task_list.replace('\n', '').replace('\t', '').replace('{', '').replace('}', '').replace('"task": ', '')
    task_list = ast.literal_eval(task_list)
    print(task_list)

def main():
    user_input = input("What would you like to do?\nAdd a Task (add)\nRemove a Task (remove)\nView all Tasks (view)\nLoad Existing Tasks (load)\nExit and Save (exit)\n")
    if user_input == "add":
        add_task()
    elif user_input == "remove":
        remove_task()
    elif user_input == "view":
        view_tasks()
    elif user_input == "load":
        load_tasks()
    elif user_input == "exit":
        save_and_exit()
    else:
        print('Please use "add", "remove", "view", or "exit".')

if __name__ == "__main__":
    while True:
        main()