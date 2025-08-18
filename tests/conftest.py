import sys
import types
from pathlib import Path

bpy_module = types.ModuleType("bpy")
bpy_module.types = types.SimpleNamespace(
    Operator=object,
    Panel=object,
    AddonPreferences=object,
)
bpy_module.app = types.SimpleNamespace(handlers=types.SimpleNamespace(persistent=lambda f: f))
bpy_module.utils = types.SimpleNamespace(register_class=lambda x: None, unregister_class=lambda x: None)
bpy_module.props = types.SimpleNamespace(
    StringProperty=lambda *a, **k: None,
    PointerProperty=lambda *a, **k: None,
    FloatProperty=lambda *a, **k: None,
    IntProperty=lambda *a, **k: None,
    BoolProperty=lambda *a, **k: None,
)

sys.modules.setdefault("bpy", bpy_module)
sys.modules.setdefault("bpy.types", bpy_module.types)
sys.modules.setdefault("bpy.app", bpy_module.app)
sys.modules.setdefault("bpy.app.handlers", bpy_module.app.handlers)
sys.modules.setdefault("bpy.utils", bpy_module.utils)
sys.modules.setdefault("bpy.props", bpy_module.props)

sys.modules.setdefault("__init__", types.ModuleType("__init__"))

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
