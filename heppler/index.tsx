export const getAllLevelThreeItems = (data: any) => {
    const levelThreeItems: any = [];
  
    for (const key in data) {
      const children = data[key].children;
      if (children) {
        children.forEach((child: any) => {
          if (child.children && child.children.length > 0) {
            child.children.forEach((levelThree: any) => {
              levelThreeItems.push(levelThree);
            });
          }
        });
      }
    }
  
    return levelThreeItems;
  };
  