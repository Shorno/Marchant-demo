export const formatPathToTitle = (pathname :string) => {

    if (pathname === "/" || pathname === "") {
        return "Dashboard";
    }

    const cleanPath = pathname.replace(/^\/+|\/+$/g, '');

    const words = cleanPath.split(/[-/]+/);

    return words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};