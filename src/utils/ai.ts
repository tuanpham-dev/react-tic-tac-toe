import { NullableSymbol, Symbol } from '../data/types'

export class Board {
  position: NullableSymbol[]
  turn: Symbol

  // by default the board is empty and X goes first
  constructor(position: NullableSymbol[] = Array(9).fill(null), turn: Symbol = 'cross') {
    this.position = position
    this.turn = turn
  }

  opositeTurn(): Symbol {
    return this.turn === 'cross' ? 'circle' : 'cross'
  }

  // location can be 0-8, indicating where to move
  // return a new board with the move played
  move(location: number): Board {
    let tempPosition = this.position.slice()
    tempPosition[location] = this.turn

    return new Board(tempPosition, this.opositeTurn())
  }

  // the legal moves in a position are all of the empty squares
  legalMoves(): number[] {
    const moves: number[] = []

    for (let i = 0; i < this.position.length; i++) {
      if (!this.position[i]) {
        moves.push(i)
      }
    }

    return moves
  }

  evaluate(originalPlayer: Symbol): number {
    let score: number = 0

    score += this.evaluateLine(0, 1, 2, originalPlayer)
    score += this.evaluateLine(3, 4, 5, originalPlayer)
    score += this.evaluateLine(6, 7, 8, originalPlayer)
    score += this.evaluateLine(0, 3, 6, originalPlayer)
    score += this.evaluateLine(1, 4, 7, originalPlayer)
    score += this.evaluateLine(2, 5, 8, originalPlayer)
    score += this.evaluateLine(0, 4, 8, originalPlayer)
    score += this.evaluateLine(2, 4, 6, originalPlayer)

    return score
  }

  evaluateLine(p1: number, p2: number, p3: number, originalPlayer: Symbol): number {
    let score: number = 0

    if (this.position[p1] === originalPlayer) {
      score = 1
    } else if (this.position[p1] !== null) {
      score = -1
    }

    if (this.position[p2] === originalPlayer) {
      if (score === 1) {
        score = 10
      } else if (score === -1) {
        return 0
      } else {
        score = 1
      }
    } else if (this.position[p2] !== null) {
      if (score === -1) {
        score = -10
      } else if (score === 1) {
        return 0
      } else {
        score = -1
      }
    }

    if (this.position[p3] === originalPlayer) {
      if (score > 0) {
        score *= 10
      } else if (score < 0) {
        return 0
      } else {
        score = 1
      }
    } else if (this.position[p3] !== null) {
      if (score < 0) {
        score *= 10
      } else if (score > 1) {
        return 0
      } else {
        score = -1
      }
    }

    return score
  }
}

const minimax = (
  board: Board,
  maximizing: boolean,
  originalPlayer: Symbol,
  maxDepth: number,
  depth = 0
) => {
  const legalMoves = board.legalMoves()

  if (legalMoves.length === 0 || depth >= maxDepth) {
    return board.evaluate(originalPlayer)
  }

  // recursive case - maximize your gains or minimize the opponent's gains
  if (maximizing) {
    let bestEval = Number.MIN_SAFE_INTEGER

    for (const move of board.legalMoves()) {
      const result = minimax(board.move(move), false, originalPlayer, maxDepth, depth + 1)
      bestEval = Math.max(result, bestEval)
    }

    return bestEval
  } else {
    // minimizing
    let worstEval = Number.MAX_SAFE_INTEGER

    for (let move of board.legalMoves()) {
      const result = minimax(board.move(move), true, originalPlayer, maxDepth, depth + 1)
      worstEval = Math.min(result, worstEval)
    }

    return worstEval
  }
}

// run minimax on every possible move to find the best one
export const findBestMove = (board: Board, maxDepth = 3) => {
  let bestEval = Number.MIN_SAFE_INTEGER
  let bestMove = -1

  for (let move of board.legalMoves()) {
    const result = minimax(board.move(move), false, board.turn, maxDepth)

    if (result > bestEval) {
      bestEval = result
      bestMove = move
    }
  }

  return bestMove
}
