import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
  test("status from props should be in the state", () => {
    const component = create(<ProfileStatus status="it" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("it");
  });

  test("after creation <span> should be displayed", async () => {
    const component = create(<ProfileStatus status="it" />);
    const root = component.root;
    const span = await root.findByType("span");
    expect(span).not.toBeNull();
  });

  test("after creation <input> shouldn't be displayed", () => {
    const component = create(<ProfileStatus status="it" />);
    const root = component.root;
    expect(async () => {
      await root.findByType("input");
    }).toThrow();
  });

  test("after creation <span> should contain correct status", async () => {
    const component = create(<ProfileStatus status="it" />);
    const root = component.root;
    const span = await root.findByType("span");
    expect(span.children[0]).toBe("it");
  });

  test("input should be displayed in EditMode instead of span", async () => {
    const component = create(<ProfileStatus status="it" />);
    const root = component.root;
    const span = await root.findByType("span");
    span.props.onDoubleClick();
    const input = await root.findByType("input");
    expect(input.props.value).toBe("it");
  });

  test("callback should be call", () => {
    const mockCallback = jest.fn();
    const component = create(
      <ProfileStatus status="it" updateStatus={mockCallback} />
    );
    const instance = component.getInstance();
    instance.deactivateEditMode();
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
