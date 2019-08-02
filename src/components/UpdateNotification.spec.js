import { mount } from "@vue/test-utils";
import UpdateNotification from "./UpdateNotification";
import { workBox, workboxEmitter } from "../workBox";

jest.mock("../workBox");

describe("UpdateNotification.vue", () => {
  let wrapper;

  beforeEach(() => {
    jest.resetModules();
    wrapper = mount(UpdateNotification);
  });

  it("matches the snapshot", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("listens on the waiting event from workbox", () => {
    expect(workBox.addEventListener).toBeCalledWith(
      "waiting",
      expect.any(Function)
    );
    workboxEmitter.emit("waiting");
    expect(wrapper.vm.isVisible).toBe(true);
  });

  it("can be toggled", () => {
    expect(wrapper.isEmpty()).toBe(true);

    wrapper.setData({ isVisible: true });

    expect(wrapper.isEmpty()).toBe(false);

    const dismissButton = wrapper
      .findAll("button")
      .filter(wrapper => wrapper.text() === "Dismiss");

    dismissButton.trigger("click");

    expect(wrapper.isEmpty()).toBe(true);
  });

  it('has an "update" button', () => {
    wrapper.setData({ isVisible: true });

    const reloadButton = wrapper
      .findAll("button")
      .filter(wrapper => wrapper.text() === "Reload");
    reloadButton.trigger("click");

    expect(workBox.addEventListener).toBeCalledWith(
      "controlling",
      expect.any(Function)
    );
    expect(workBox.messageSW).toBeCalledWith({ type: "SKIP_WAITING" });

    const { reload } = window.location;
    window.location.reload = jest.fn();
    workboxEmitter.emit("controlling");
    expect(window.location.reload).toBeCalled();
    window.location.reload = reload;
  });
});
