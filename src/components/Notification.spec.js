import { mount } from "@vue/test-utils";
import Notification from "./Notification";

describe("Notification.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Notification, {
      slots: {
        default: "<button/>"
      }
    });
  });

  it("matches the snapshot", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("emits a 'close' event when press ESC", () => {
    wrapper.trigger("keyup.esc");
    expect(wrapper.emitted("close")).toBeTruthy();
  });

  it("has a default slot", () => {
    expect(wrapper.contains("button")).toBe(true);
  });
});
