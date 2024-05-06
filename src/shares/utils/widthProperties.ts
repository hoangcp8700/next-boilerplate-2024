// Example
// don't use withProperties: export default Form
// use withProperties: export default withProperties(Form, {Control, Label, Submit})
// result: <Form/> <Form.Control /> <Form.Label />, ...
export function withProperties<A, B extends object>(
  component: A,
  properties: B,
): A & B {
  const Component = component;
  Object.keys(properties).forEach((key) => {
    (Component as Record<string, unknown>)[key] = (
      properties as Record<string, unknown>
    )[key];
  });
  return Component as A & B;
}
