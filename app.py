import pyautogui
from pynput import mouse
import time


def italicize_word():
    # Add a small delay to allow time for the script to focus on the word
    time.sleep(0.01)

    # Press the hotkey for italicizing (Ctrl + I)
    pyautogui.hotkey('ctrl', 'i')


def on_click(x, y, button, pressed):
    if pressed:
        # Call the function to italicize the word
        italicize_word()


# Set up the listener
with mouse.Listener(on_click=on_click) as listener:
    listener.join()
