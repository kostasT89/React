import Route from 'route-parser';

export default function checkAuthForRoute(authorizedRoutes = [], pathname) {
  const outcome = authorizedRoutes.includes(pathname);
  if (!outcome) {
    const foundMatch = authorizedRoutes.some((authorizedRoute) => {
      const route = new Route(authorizedRoute);
      const isMatch = !!route.match(pathname);
      return isMatch;
    });
    return foundMatch;
  }
  return outcome;
}
