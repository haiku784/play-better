from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'initial_revision'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    op.create_table(
        'gameplay_sessions',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=True),
        sa.Column('session_data', sa.LargeBinary(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )

def downgrade():
    op.drop_table('gameplay_sessions')
