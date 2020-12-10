import createBookmark from './createBookmark';
import listBookmark from './listBookmark';
import Task from './type';

type AppSyncEvent = {
   info: {
     fieldName: string
  },
   arguments: {
     task: Task
  }
}

exports.handler = async (event:AppSyncEvent) => {
    switch (event.info.fieldName) {
        case "createBookmark":
            return await createBookmark(event.arguments.task);
        case "listBookmark":
            return await listBookmark();
               default:
            return null;
    }
}