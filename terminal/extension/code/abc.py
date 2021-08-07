from abc import ABC, abstractmethod
from typing import Any, NamedTuple, Optional

Inputs = Optional[list[str]]


class CodeResult(NamedTuple):
    STDERR: Optional[str]
    STDOUT: Optional[str]


class CantExecuteError(Exception):
    pass


class Code(ABC):
    __slots__ = ("_inputs", "_source", "_raw")

    def __init__(self, source: str, inputs: Inputs = None,) -> None:
        self._inputs = inputs or []
        self._source = source
        self._raw = source

    @property
    def inputs(self) -> Inputs:
        """Returns the code inputs."""
        return (self._inputs or None)

    @inputs.setter
    def inputs(self, v: Any) -> None:
        if type(v) is list:
            return self._inputs.extend(v)

        if type(v) is str:
            return self._inputs.append(v)

        raise TypeError("list or str expected")

    @property
    def source(self) -> str:
        """Returns actual source code."""
        return self._source

    @property
    def raw(self) -> str:
        """Returns raw code."""
        return self._raw

    def can_execute(self) -> bool:
        """Says if the code can be executed."""
        return True

    def parse_source(self) -> None:
        """Parse a new source code."""
        self._source = self._raw

    async def execute(self, inputs: Inputs = None, *, safe: bool = False) -> CodeResult:
        if not safe:
            if not self.can_execute():
                raise CantExecuteError()

        self.parse_source()
        return await self._execute()

    @abstractmethod
    async def _execute(self) -> CodeResult:
        ...
