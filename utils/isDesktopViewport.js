export const isDesktopViewport = (page)=>{
    var size = page.viewportSize();
     return size.width >= 600;
 }