import pytest

from lib import install_dependencies
from lib import event_loop


class DummyRBX:
    def __init__(self):
        self.is_installing_dependencies = False
        self.is_finished_installing_dependencies = False
        self.needs_restart = False


class DummyWindowManager:
    def __init__(self):
        self.rbx = DummyRBX()


class DummyContext:
    def __init__(self):
        self.window_manager = DummyWindowManager()


class DummyTask:
    def result(self):
        raise Exception("boom")


def test_dependencies_directory_removed_on_error(tmp_path, monkeypatch):
    tmp_dir = tmp_path / "deps"
    tmp_dir.mkdir()
    (tmp_dir / "file.txt").write_text("data")
    monkeypatch.setattr(install_dependencies, "dependencies_public_directory", tmp_dir)

    plugin = install_dependencies.RBX_OT_install_dependencies()
    ctx = DummyContext()

    def fake_submit(async_coroutine, done_callback):
        done_callback(DummyTask())

    monkeypatch.setattr(event_loop, "submit", fake_submit)

    plugin.execute(ctx)

    assert not tmp_dir.exists()
