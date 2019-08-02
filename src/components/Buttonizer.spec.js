import { mount } from "@vue/test-utils";
import Buttonizer from "./Buttonizer";

describe("Buttonizer.vue", () => {
  const wrapper = mount({
    template: `<Buttonizer v-bind='$attrs'><button>test</button></Buttonizer>`,
    components: { Buttonizer },
    inheritAttrs: false
  });

  it.each(["primary", "secondary", "icon"])(
    'supports the modifier "%s"',
    modifier => {
      wrapper.setProps({ modifier });
      expect(wrapper.classes(modifier)).toBe(true);
    }
  );

  it("supports full width buttons", () => {
    wrapper.setProps({ fullWidth: true });
    expect(wrapper.classes("fullWidth")).toBe(true);
  });
});
